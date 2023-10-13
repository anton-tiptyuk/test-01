import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { AstComposer } from '@/domain/ast-parser/ast-composer';
import { FormatVersion } from '@/domain/format-version';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class ParseAstCommand extends AbstractCliCommand {
  get argNumber(): number {
    return 2;
  }

  get argList(): string[] {
    return ['sourcePath', 'destinationPath'];
  }

  async invoke(args: any[]) {
    const [sourcePath, destinationPath] = args;

    const dumpString = fs.readFileSync(sourcePath, { encoding: 'utf8' });
    const composer = new AstComposer(FormatVersion.v1);
    const rootNode = composer.compose(dumpString);

    fs.writeFileSync(destinationPath, JSON.stringify(rootNode, undefined, 2));
  }
}
