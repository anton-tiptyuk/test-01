import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department, Donation, Employee, Statement } from '@/db/models';

@Injectable()
export class DbLayerService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(Statement)
    private readonly statementRepo: Repository<Statement>,
  ) {}

  async importData({
    departments,
    donations,
    employees,
    statements,
  }: {
    departments: Partial<Department>[];
    donations: Partial<Donation>[];
    employees: Partial<Employee>[];
    statements: Partial<Statement>[];
  }) {
    await this.statementRepo.delete({});
    await this.donationRepo.delete({});
    await this.employeeRepo.delete({});
    await this.departmentRepo.delete({});

    await this.departmentRepo.insert(departments);
    await this.employeeRepo.insert(employees);
    await this.statementRepo.insert(statements);
    await this.donationRepo.insert(donations);
  }
}
