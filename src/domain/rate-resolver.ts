import { jsDateToIsoDate } from '@/common/date';

import { Currency } from '@/domain/currencies';
import { ICurrencyRate } from '@/domain/icurrency-rate';

export class RateResolver {
  private readonly ratesByCurrencyAndDate: Partial<
    Record<Currency, Record<string, number>>
  > = {};

  constructor(rates: ICurrencyRate[]) {
    rates.forEach(({ currency, date, value }) => {
      if (!this.ratesByCurrencyAndDate[currency]) {
        this.ratesByCurrencyAndDate[currency] = {};
      }

      const isoDate = jsDateToIsoDate(date);

      this.ratesByCurrencyAndDate[currency][isoDate] = value;
    });
  }

  getRate(currency: Currency, date: Date) {
    return this.ratesByCurrencyAndDate[currency][jsDateToIsoDate(date)];
  }
}
