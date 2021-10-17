#!/usr/bin/env sh
set -e

cd /usr/src
npm install

cd /usr/src/backend
npm install

cd /usr/src/service-logbook
npm install
npx migrate-mongo up -f './migrate-mongo-config.cjs'
npm run serve:development
