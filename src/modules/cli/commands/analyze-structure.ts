import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { AstComposer } from '@/domain/ast-parser/ast-composer';
import { FormatVersion } from '@/domain/format-version';
import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class AnalyzeStructureCommand extends AbstractCliCommand {
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

    const propertiesByEntityName: Record<string, Set<string>> = {};

    const getPropertiesSetByEntityName = (name: string) => {
      let result = propertiesByEntityName[name];
      if (!result) {
        result = new Set();
        propertiesByEntityName[name] = result;
      }
      return result;
    };

    const traverseNode = (node: AstNodeBase) => {
      const propertySet = getPropertiesSetByEntityName(node.name);

      Object.keys(node.properties).forEach((propertyName) =>
        propertySet.add(propertyName),
      );

      Object.values(node.nested).forEach((nestedNodes) =>
        nestedNodes.forEach((nestedNode) => traverseNode(nestedNode)),
      );
    };

    traverseNode(rootNode);

    const result = Object.entries(propertiesByEntityName).reduce(
      (acc, [className, propertySet]) => {
        acc[className] = Array.from(propertySet);
        return acc;
      },
      <Record<string, string[]>>{},
    );

    fs.writeFileSync(destinationPath, JSON.stringify(result, undefined, 2));
  }
}
