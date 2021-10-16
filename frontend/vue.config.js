module.exports = {
  devServer: {
    port: 8080,
    allowedHosts: [
      "akun.localhost",
      "absensi.localhost",
      "frontend.localhost"
    ]
  },
  transpileDependencies: [
    "vuetify"
  ]
}
