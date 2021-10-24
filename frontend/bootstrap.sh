#!/usr/bin/env sh
set -e

cd /usr/src
flock package.json npm install

cd /usr/src/frontend
npm run serve:development
