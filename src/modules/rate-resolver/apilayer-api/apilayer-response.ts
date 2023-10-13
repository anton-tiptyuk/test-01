import { Currency } from '@/domain/currencies';

export interface ApilayerResponse {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: Record<string, Rate>;
}

export type Rate = Partial<Record<Currency, number>>;
