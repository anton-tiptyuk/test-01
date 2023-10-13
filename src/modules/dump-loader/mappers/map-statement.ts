import { parseDumpDate } from '@/common/date';

import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';

import { Statement } from '@/db/models';

export function mapStatements(employeeId: number, salaryNode: AstNodeBase) {
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
