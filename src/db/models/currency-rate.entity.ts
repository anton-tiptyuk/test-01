import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Currency } from '@/domain/currencies';
import { ICurrencyRate } from '@/domain/icurrency-rate';

import * as lengths from './field-lengths';
import { decimalTransformer } from './decimal-transformer';

@Entity()
export class CurrencyRate implements ICurrencyRate {
  @PrimaryColumn('simple-enum', { enum: Currency })
  currency: Currency;

  @PrimaryColumn()
  date: Date;

  @Column('decimal', {
    precision: lengths.RATE_PRECISION,
    scale: 18,
    transformer: decimalTransformer,
  })
  value: number;
}
