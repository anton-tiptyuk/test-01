import { Injectable } from '@nestjs/common';

import { AstComposer } from '@/domain/ast-parser/ast-composer';
import { FormatVersion } from '@/domain/format-version';

import { Department, Donation, Employee, Statement } from '@/db/models';

import { DbLayerService } from '../db-layer/db-layer.service';

import {
  buildRatesDictionary,
  mapDepartment,
  mapDonations,
  mapStatements,
} from './mappers';

@Injectable()
export class DumpLoaderService {
  constructor(private readonly dbLayerService: DbLayerService) {}

  async load(dump: string) {
    const composer = new AstComposer(FormatVersion.v1);
    const rootNode = composer.compose(dump);

    const employeeNodes = rootNode.nested['E-List'][0].nested['Employee'];
    const ratesNodes = rootNode.nested['Rates'][0].nested['Rate'];
    const ratesDictionary = buildRatesDictionary(ratesNodes);

    const departmentsById: Record<number, Partial<Department>> = {};
    const statements: Partial<Statement>[] = [];
    const donations: Partial<Donation>[] = [];

    const employees = employeeNodes.map((employeeNode): Partial<Employee> => {
      const { name, surname } = employeeNode.properties;
      const id = Number(employeeNode.properties.id);

      const department = mapDepartment(employeeNode.nested['Department'][0]);

      departmentsById[department.id] = department;

      statements.push(...mapStatements(id, employeeNode.nested['Salary'][0]));

      const donationNodes = employeeNode.nested['Donation'];
      if (donationNodes) {
        donations.push(...mapDonations(id, donationNodes, ratesDictionary));
      }

      return { id, name, surname, departmentId: department.id };
    });

    await this.dbLayerService.importData({
      employees,
      departments: Object.values(departmentsById),
      statements,
      donations,
    });
  }
}
