#!/usr/bin/env sh
set -e

cd /usr/src/postgres-database
npm install
npx sequelize-cli db:migrate

cd /usr/src
npm install

cd /usr/src/service-monitoring
npm install
npm run serve:development
