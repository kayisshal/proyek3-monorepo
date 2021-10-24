#!/usr/bin/env sh
set -e

cd /usr/src
flock package.json npm install

cd /usr/src/postgres-database
npx sequelize-cli db:migrate

cd /usr/src/service-monitoring
npm run serve:development
