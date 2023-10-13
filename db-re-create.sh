#!/usr/bin/env bash

yarn db schema:drop
yarn db migration:run
