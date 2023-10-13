#!/usr/bin/env bash

ts-node node_modules/typeorm/cli.js -d ormconfig.ts migration:generate src/db/migrations/$1
