#!/usr/bin/env bash

# This is here since before actually
# creating database entity models and loading the dump
# I've played around parsing the dump and made some analysis of
# its structure and property values making sure nothing irregular
# will emerge

# also, the dump and the task.md is not in the repository to avoid the project being searchable.

yarn build

# dev investigations
yarn cli:built ParseAstCommand ignored/dump.txt ignored/step01-ast.json
yarn cli:built AnalyzeStructureCommand ignored/dump.txt ignored/step02-analyzed.json
yarn cli:built AnalyzePropertyValuesCommand ignored/dump.txt ignored/step03-property-values.json

# # loading dump
# yarn cli:built LoadDumpWithApiRatesCommand ignored/dump.txt
# yarn cli:built LoadDumpWithFixedRatesCommand ignored/dump.txt

# # fetching report
# yarn cli:built ReportCommand ignored/report.json
