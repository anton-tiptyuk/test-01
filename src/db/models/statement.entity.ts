import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

import * as lengths from './field-lengths';
import { decimalTransformer } from './decimal-transformer';
import { Employee } from './employee.entity';

@Entity()
export class Statement {
  @PrimaryColumn()
  id: number;

  @Column('decimal', {
    precision: lengths.AMOUNT_PRECISION,
    scale: 2,
    transformer: decimalTransformer,
  })
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column()
  employeeId: number;
}
