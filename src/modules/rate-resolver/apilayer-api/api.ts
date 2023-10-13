import axios from 'axios';

import { config } from '@/common/config';

import { Currency, convertableCurrencySymbols } from '@/domain/currencies';

import { ApilayerResponse } from './apilayer-response';
import { dummyResponse } from './dummy-response';

const baseURL = 'https://api.apilayer.com/';

export class ApilayerApi {
  constructor(private readonly useDummy = true) {}

  async getTimeseries(startDate: string, endDate: string) {
    if (this.useDummy) {
      return Promise.resolve(dummyResponse);
    }

    const response = await axios.get<ApilayerResponse>('/fixer/timeseries', {
      baseURL,
      headers: {
        apikey: config.apilayerApiKey,
      },
      params: {
        base: Currency.USD,
        symbols: convertableCurrencySymbols,
        start_date: startDate,
        end_date: endDate,
      },
    });

    return response.data;
  }
}
