import { Entity, Column, PrimaryColumn } from 'typeorm';

import * as lengths from './field-lengths';

@Entity()
export class Department {
  @PrimaryColumn()
  id: number;

  @Column({ length: lengths.DEPARTMENT_NAME })
  name: string;
}
