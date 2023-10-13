import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { RateResolver } from '@/domain/rate-resolver';

import { CurrencyRate } from '@/db/models';

import { DbLayerService } from '../db-layer/db-layer.service';

import { ApilayerApi } from './apilayer-api/api';

@Injectable()
export class RateResolverService {
  private readonly apilayerApi = new ApilayerApi();

  constructor(private readonly dbLayerService: DbLayerService) {}

  async pollAndUpdate() {
    const response = await this.apilayerApi.getTimeseries(
      '2021-01-01',
      '2021-03-24',
    );

    const currencyRates = Object.entries(response.rates).flatMap(
      ([dateString, rates]) =>
        Object.entries(rates).map(
          ([currency, value]) =>
            <CurrencyRate>{
              currency,
              date: DateTime.fromISO(dateString, { zone: 'UTC' }).toJSDate(),
              value: value ? 1 / value : 0,
            },
        ),
    );

    await this.dbLayerService.importCurrencyRates(currencyRates);
  }

  async getResolver() {
    return new RateResolver(await this.dbLayerService.getCurrencyRates());
  }
}
