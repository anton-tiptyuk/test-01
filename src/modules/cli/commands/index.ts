import { Type } from '@nestjs/common';

import { AbstractCliCommand } from '../abstract-cli-command';

import { AnalyzePropertyValuesCommand } from './analyze-property-values';
import { AnalyzeStructureCommand } from './analyze-structure';
import { LoadDumpCommand } from './load-dump';
import { ParseAstCommand } from './parse-ast';

export const commandsByNames = [
  ParseAstCommand,
  AnalyzeStructureCommand,
  AnalyzePropertyValuesCommand,
  LoadDumpCommand,
].reduce(
  (acc, val) => {
    acc[val.name] = val;
    return acc;
  },
  <Record<string, Type<AbstractCliCommand>>>{},
);
