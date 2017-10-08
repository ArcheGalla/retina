#!/usr/bin/env bash

cd ~/retina/
git checkout --force master
git pull
rm -rf ./node_modules
npm install
npm run build
pm2 restart start.yml