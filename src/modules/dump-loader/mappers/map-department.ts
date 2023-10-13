import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';

import { Department } from '@/db/models';

export function mapDepartment(node: AstNodeBase): Partial<Department> {
  const { id, name } = node.properties;
  return { id: Number(id), name };
}
