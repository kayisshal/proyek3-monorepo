import express from 'express'
import httpProxy from 'http-proxy-middleware'

const PORT = process.env.PORT || 5000

const app = express()

app.use((req, res, next) => {
  const host = req.get('host')

  if (host === `akun.localhost:${PORT}`) {
    akunProxy(req, res, next)
  } else if (host === `frontend.localhost:${PORT}`) {
    frontendProxy(req, res, next)
  } else {
    res.end()
  }
})

app.listen(PORT, () =>
  console.log(`development-http-proxy listening on port ${PORT}!`)
)

const akunProxy = httpProxy.createProxyMiddleware({
  target: `http://localhost:14415`,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/keycloak-proxy': '/'
  },
  router: {
    '/api': 'http://localhost:14418',
    '/keycloak-proxy': 'http://localhost:14416'
  }
})

const frontendProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:14415',
  changeOrigin: true,
  ws: true
})
