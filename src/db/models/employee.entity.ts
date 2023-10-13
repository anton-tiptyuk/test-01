import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

import * as lengths from './field-lengths';
import { Department } from './department.entity';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: number;

  @Column({ length: lengths.EMPLOYEE_NAME })
  name: string;

  @Column({ length: lengths.EMPLOYEE_SURNAME })
  surname: string;

  @ManyToOne(() => Department)
  department: Department;

  @Column()
  departmentId: number;
}
