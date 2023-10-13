import { Type } from '@nestjs/common';

import { AbstractCliCommand } from '../abstract-cli-command';

import { AnalyzePropertyValuesCommand } from './analyze-property-values';
import { AnalyzeStructureCommand } from './analyze-structure';
import { LoadDumpWithApiRatesCommand } from './load-dump-with-api-rates';
import { LoadDumpWithFixedRatesCommand } from './load-dump-with-fixed-rates';
import { ParseAstCommand } from './parse-ast';
import { ReportCommand } from './report';
import { UpdateCurrencyRatesCommand } from './update-currency-rates';

export const commandsByNames = [
  ParseAstCommand,
  AnalyzeStructureCommand,
  AnalyzePropertyValuesCommand,
  LoadDumpWithApiRatesCommand,
  LoadDumpWithFixedRatesCommand,
  ReportCommand,
  UpdateCurrencyRatesCommand,
].reduce(
  (acc, val) => {
    acc[val.name] = val;
    return acc;
  },
  <Record<string, Type<AbstractCliCommand>>>{},
);
