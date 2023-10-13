import { FormatVersion } from '../format-version';
import { AstNodeV1 } from './v1/ast-node-v1';
import { AstNodeBase } from './ast-node-base';

export const astNodeFactory = (version: FormatVersion): AstNodeBase => {
  if (FormatVersion.v1 === version) {
    return new AstNodeV1(true);
  } else if (FormatVersion.v2 === version) {
    throw new Error('not implemented');
  } else {
    throw new Error('not implemented');
  }
};
