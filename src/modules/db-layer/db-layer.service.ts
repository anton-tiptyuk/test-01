import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CurrencyRate,
  Department,
  Donation,
  Employee,
  Statement,
} from '@/db/models';

// in fact, there are no donators who donated less than $100 in the dump
const thresholdDonationSumUsd = 100;

@Injectable()
export class DbLayerService {
  constructor(
    @InjectRepository(CurrencyRate)
    private readonly currencyRateRepo: Repository<CurrencyRate>,
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

  async importCurrencyRates(currencyRates: Partial<CurrencyRate>[]) {
    await this.currencyRateRepo.delete({});
    await this.currencyRateRepo.insert(currencyRates);
  }

  getCurrencyRates() {
    return this.currencyRateRepo.find();
  }

  queryReport() {
    return this.employeeRepo.query(
      `
      SELECT
        employee.id,
        employee."name",
        employee.surname,
        10000 * donaters.amount_usd/total.total AS reward_usd
      FROM
      (SELECT SUM(amount_usd) AS total FROM donation) AS total,
      (
        SELECT employee_id, SUM(amount_usd) AS amount_usd FROM donation
        GROUP BY 1
        HAVING SUM(amount_usd) > $1
      ) AS donaters,
      employee
      WHERE employee.id = donaters.employee_id
      ORDER BY employee.id
      `,
      [thresholdDonationSumUsd],
    );
  }
}
