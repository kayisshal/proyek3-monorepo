#!/usr/bin/env sh
set -e

cd /usr/src
flock package.json npm install

cd /usr/src/akun-keycloak-proxy
npm run serve:development
