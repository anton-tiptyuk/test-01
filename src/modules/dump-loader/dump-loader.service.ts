import { Injectable } from '@nestjs/common';

import { parseDumpDate } from '@/common/date';

import { AstComposer } from '@/domain/ast-parser/ast-composer';
import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';
import { FormatVersion } from '@/domain/format-version';

import { Department, Employee, Statement } from '@/db/models';

import { DbLayerService } from '../db-layer/db-layer.service';

@Injectable()
export class DumpLoaderService {
  constructor(private readonly dbLayerService: DbLayerService) {}

  private static mapDepartment(node: AstNodeBase): Partial<Department> {
    const { id, name } = node.properties;
    return { id: Number(id), name };
  }

  private static mapStatements(employeeId: number, salaryNode: AstNodeBase) {
    return salaryNode.nested['Statement'].map(
      (statementNode): Partial<Statement> => {
        const { id, amount, date } = statementNode.properties;
        return {
          id: Number(id),
          amount: Number(amount),
          date: parseDumpDate(date),
          employeeId,
        };
      },
    );
  }

  async load(dump: string) {
    const composer = new AstComposer(FormatVersion.v1);
    const rootNode = composer.compose(dump);

    const employeeNodes = rootNode.nested['E-List'][0].nested['Employee'];

    const departmentsById: Record<number, Partial<Department>> = {};
    const statements: Partial<Statement>[] = [];

    const employees = employeeNodes.map((employeeNode): Partial<Employee> => {
      const { name, surname } = employeeNode.properties;
      const id = Number(employeeNode.properties.id);

      const department = DumpLoaderService.mapDepartment(
        employeeNode.nested['Department'][0],
      );

      departmentsById[department.id] = department;

      statements.push(
        ...DumpLoaderService.mapStatements(
          id,
          employeeNode.nested['Salary'][0],
        ),
      );

      return { id, name, surname, departmentId: department.id };
    });

    await this.dbLayerService.importData({
      employees,
      departments: Object.values(departmentsById),
      statements,
      donations: [],
    });
  }
}
