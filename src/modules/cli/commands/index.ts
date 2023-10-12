import { Type } from '@nestjs/common';

import { AbstractCliCommand } from '../abstract-cli-command';

import { AnalyzePropertyValuesCommand } from './analyze-property-values';
import { AnalyzeStructureCommand } from './analyze-structure';
import { LoadDumpCommand } from './load-dump';
import { ParseAstCommand } from './parse-ast';
import { ReportCommand } from './report';
import { UpdateCurrencyRatesCommand } from './update-currency-rates';

export const commandsByNames = [
  ParseAstCommand,
  AnalyzeStructureCommand,
  AnalyzePropertyValuesCommand,
  LoadDumpCommand,
  ReportCommand,
  UpdateCurrencyRatesCommand,
].reduce(
  (acc, val) => {
    acc[val.name] = val;
    return acc;
  },
  <Record<string, Type<AbstractCliCommand>>>{},
);
