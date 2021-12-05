# Development HTTP Proxy

Proyek ini memiliki banyak service. Setiap service dirancang untuk diakses melalui domain atau path pada domain tertentu. [Development HTTP Proxy](https://github.com/d4jtk18p3/proyek3-development-http-proxy) digunakan untuk menggantikan peranan reverse-proxy yang mampu mendistribusikan *request* pada service tertentu sesuai domain yang diakses.

## Pemetaan service default

| Proxy Hostname                             | Service Hostname               | Project                                                                                  | Keterangan                             |
| ------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------- |
|                                            | http://localhost:14417         | Keycloak                                                                                 |                                        |
| http://akun.localhost:5000                 | http://frontend.localhost:5000 | [@proyek3/frontend](https://github.com/d4jtk18p3/proyek3-frontend)                       | menggunakan rute `/akun` pada frontend |
| http://akun.localhost:5000/api             | http://localhost:14418         | [@proyek3/akun-api](https://github.com/d4jtk18p3/proyek3-akun-api)                       |                                        |
| http://akun.localhost:5000/keycloak-proxy  | http://localhost:14416         | [@proyek3/akun-keycloak-proxy](https://github.com/d4jtk18p3/proyek3-akun-keycloak-proxy) |                                        |
| http://frontend.localhost:5000             | http://localhost:14415         | [@proyek3/frontend](https://github.com/d4jtk18p3/proyek3-frontend)                       |                                        |

