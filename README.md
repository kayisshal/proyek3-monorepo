# Workspace

Proyek ini menggunakan [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) agar dapat dengan mudah mengelola *dependency* antar *sub-project*.

## Melakukan pengembangan

Sebelum dapat melakukan pengembangan, struktur direktori sebagai berikut harus dibuat:

    proyek3               # workspace
    ├── backend
    │   └── package.json  # package.json untuk backend (sub-project)
    ├── postgres-database
    │   └── package.json  # package.json untuk postgres-database (sub-project)
    ├── ...               # sub-project lain
    └── package.json      # package.json untuk proyek3 (workspace)

Struktur direktori tersebut dapat dibuat dengan cara:

###### Klon repositori ini ke dalam direktori proyek3

```sh
$ git clone https://github.com/d4jtk18p3/proyek3-workspace.git proyek3
```

###### Masuk ke dalam repositori proyek3

```sh
$ cd proyek3
```

###### Klon semua *sub-project* yang ada

```sh
$ git clone https://github.com/d4jtk18p3/proyek3-backend backend
$ git clone https://github.com/d4jtk18p3/proyek3-postgres-database postgres-database
$ git clone https://github.com/d4jtk18p3/proyek3-service-absensi service-absensi
$ git clone https://github.com/d4jtk18p3/proyek3-service-penilaian service-penilaian
```

###### Jalankan npm install dalam direktori proyek3 (workspace)

```sh
$ npm install
```

###### Masuk ke dalam direktori dari *sub-project* yang akan dikembangkan dan ikuti arahan `README.md` dari *sub-project* yang bersangkutan

## Menambahkan *sub-project* baru

Untuk menambah *sub-project* baru langkah yang diperlukan yaitu:

1. Buat repositori dengan nama `proyek3-<nama-sub-project>`
2. Inisiasi project ke dalam repositori
3. Jika project baru yang dibuat adalah project nodejs, ubah entri `name` dalam `package.json` menjadi `@proyek3/<nama-sub-project>`
4. Tambahkan nama direktori *sub-project* ke dalam entri `workspaces` pada [package.json](package.json) dari repository ini
4. Tambahkan dokumentasi mengenai *sub-project* ke dalam [README.md](README.md) dari repository ini

## Menggunakan *sub-project* lain sebagai *dependency*

Untuk menggunakan *sub-project* sebagai *dependency*, pastikan terdapat entri `main` dan/atau `exports` dalam `package.json` dari *sub-module* yang akan digunakan. Lakukan hal seperti berikut untuk melakukan import

```js
import <menyesuaikan> from '@proyek3/<nama-sub-project>'
```
