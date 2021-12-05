#!/usr/bin/env node

import axios from 'axios'
import cliProgress from 'cli-progress'
import crypto from 'crypto'
import fs from 'fs'
import shell from 'shelljs'
import path from 'path'
import tar from 'tar'
import url from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const { argv } = yargs(hideBin(process.argv))

const baseDir = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)), '..'
)
const cacheDir = path.join(baseDir, '.cache')

const version = argv.target || '13.0.1'
const baseUrl = 'https://github.com/keycloak/keycloak/releases/download/'
const filename = `keycloak-${version}`
const tarballFilename = `${filename}.tar.gz`
const tarballUrl = new URL(`${version}/${tarballFilename}`, baseUrl).href
const cachedTarballFilename = path.join(cacheDir, tarballFilename)
const checksumFilename = `${tarballFilename}.sha1`
const checksumUrl = new URL(`${version}/${checksumFilename}`, baseUrl).href
const cachedChecksumFilename = path.join(cacheDir, checksumFilename)

const setup = async (argv) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }

  if (!fs.existsSync(cachedChecksumFilename)) {
    await download(checksumUrl, cachedChecksumFilename)
  }

  let actualChecksum = null
  const expectedChecksum = fs.readFileSync(cachedChecksumFilename, 'utf8')

  if (fs.existsSync(cachedTarballFilename)) {
    actualChecksum = crypto
      .createHash('sha1')
      .update(fs.readFileSync(cachedTarballFilename), 'utf8')
      .digest('hex')
  }

  if (expectedChecksum !== actualChecksum) {
    await download(tarballUrl, cachedTarballFilename)
  }

  tar.x({ C: cacheDir, file: cachedTarballFilename, sync: true })
  shell.mv(path.join(cacheDir, `${filename}/*`), baseDir)

  const ext = process.platform === 'win32' ? 'bat' : 'sh'

  shell.exec(`bin/add-user-keycloak.${ext} -r master -u admin -p admin`)
  shell.exec(
    `bin/standalone.${ext} -Djboss.http.port=14417`,
    { async:true }
  )
  await loginKeycloak()
  shell.exec(
    `bin/kcadm.${ext} create realms -s realm=development -s enabled=true`
  )  
  shell.exec(
    `bin/kcadm.${ext} create partialImport -r development -s ifResourceExists=OVERWRITE -o -f realm-development.json`
  )
  shell.exec(
    `bin/jboss-cli.${ext} --connect --connect command=:shutdown`
  )  
}

const loginKeycloak = async () => {
  const cmd =  `\
    bin/kcadm.sh config credentials \
      --server http://localhost:14417/auth \
      --realm master \
      --user admin \
      --password admin`

  let code = null
  do {
    code = shell.exec(cmd).code
  } while (code !== 0)
}

const download = (url, target) => {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${target}`)

    const progressBar = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
    )
    let receivedBytes = 0

    const file = fs.createWriteStream(target)

     file.on('finish', () => {
       progressBar.stop()
       resolve()
    })

    file.on('error', (err) => {
      progressBar.stop()
      reject(err)
    })

    axios({
      method: 'get',
      url,
      responseType: 'stream'
    }).then((res) => {
      progressBar.start(res.headers['content-length'], 0)

      res.data.on('data', (chunk) => {
        receivedBytes += chunk.length
        progressBar.update(receivedBytes)
      })

      res.data.pipe(file)
    }).catch((err) => {
      reject(err)
    })
  })
}

setup(argv).catch(err => {
  console.error(err)
})