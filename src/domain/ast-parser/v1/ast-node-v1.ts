import { AstNodeBase } from '../ast-node-base';
import { IParsedLineV1, parseLineV1 } from './parsed-line-v1';

export class AstNodeV1 extends AstNodeBase {
  private readonly indentSize: number;

  constructor(isRoot: boolean, line?: IParsedLineV1) {
    super();
    const { indentSize, name } = isRoot
      ? { indentSize: -1, name: 'root' }
      : line;

    this.indentSize = indentSize;
    this._name = name;
  }

  pushLine(line: string) {
    const parsedLine = parseLineV1(line);
    return this.pushParsedLineAndCheckConsumed(parsedLine);
  }

  pushParsedLineAndCheckConsumed(line: IParsedLineV1) {
    if (!line.isMatch) return true;

    const isConsumedByChild = !!(<AstNodeV1>(
      this.currentChild
    ))?.pushParsedLineAndCheckConsumed(line);

    if (isConsumedByChild) return true;

    if (!isConsumedByChild) {
      this.currentChild = undefined;

      const { indentSize, isCapital, name, value } = line;

      if (this.indentSize >= indentSize) {
        return false;
      } else if (isCapital) {
        this.addNested(new AstNodeV1(false, line));
        return true;
      } else {
        this.addProperty(name, value);
        return true;
      }
    }
  }
}
