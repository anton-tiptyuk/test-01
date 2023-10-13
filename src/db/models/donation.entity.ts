import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

import { Currency } from '@/domain/currencies';

import * as lengths from './field-lengths';
import { decimalTransformer } from './decimal-transformer';
import { Employee } from './employee.entity';

@Entity()
export class Donation {
  @PrimaryColumn()
  id: number;

  @Column('decimal', {
    precision: lengths.AMOUNT_PRECISION,
    scale: 2,
    transformer: decimalTransformer,
  })
  amountUsd: number;

  @Column('decimal', {
    precision: lengths.AMOUNT_PRECISION,
    scale: 2,
    transformer: decimalTransformer,
  })
  amountOriginal: number;

  @Column('simple-enum', { enum: Currency })
  currency: Currency;

  @Column()
  date: Date;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column()
  employeeId: number;
}
