import { Currency } from './currencies';

export interface ICurrencyRate {
  currency: Currency;
  date: Date;
  value: number;
}
