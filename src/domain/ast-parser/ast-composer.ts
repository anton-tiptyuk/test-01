import { FormatVersion } from '../format-version';

import { astNodeFactory } from './ast-node-factory';

export class AstComposer {
  constructor(private readonly version: FormatVersion) {}

  compose(dump: string) {
    const lines = dump.split(/\r?\n/);
    const rootNode = astNodeFactory(this.version);
    lines.forEach((line) => rootNode.pushLine(line)), rootNode.finalize();
    return rootNode;
  }
}
