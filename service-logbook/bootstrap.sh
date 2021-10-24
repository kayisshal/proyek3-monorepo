#!/usr/bin/env sh
set -e

cd /usr/src
flock package.json npm install

cd /usr/src/service-logbook
npx migrate-mongo up -f './migrate-mongo-config.cjs'
npm run serve:development
