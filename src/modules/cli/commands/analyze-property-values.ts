import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { parseDumpDate } from '@/common/date';

import { AstComposer } from '@/domain/ast-parser/ast-composer';
import { FormatVersion } from '@/domain/format-version';
import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class AnalyzePropertyValuesCommand extends AbstractCliCommand {
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

    const propertyValuesByPath: Record<string, Set<string>> = {};

    const getPropertyValuesByPath = (path: string) => {
      let result = propertyValuesByPath[path];
      if (!result) {
        result = new Set();
        propertyValuesByPath[path] = result;
      }
      return result;
    };

    const traverseNode = (node: AstNodeBase, pathPrefix: string) => {
      const nodePath = pathPrefix ? `${pathPrefix}.${node.name}` : node.name;

      Object.entries(node.properties).forEach(([propertyName, value]) => {
        const propertyPath = `${nodePath}.${propertyName}`;
        const propertyValues = getPropertyValuesByPath(propertyPath);
        propertyValues.add(value.trim());
      });

      Object.values(node.nested).forEach((nestedNodes) =>
        nestedNodes.forEach((nestedNode) => traverseNode(nestedNode, nodePath)),
      );
    };

    traverseNode(rootNode, '');

    const result = Object.entries(propertyValuesByPath).reduce(
      (acc, [path, values]) => {
        acc[path] = Array.from(values);
        return acc;
      },
      <Record<string, string[]>>{},
    );

    result['root.E-List.Employee.Donation.date'] = <any>(
      result['root.E-List.Employee.Donation.date'].flatMap((dateStr) => [
        dateStr,
        parseDumpDate(dateStr),
      ])
    );

    fs.writeFileSync(destinationPath, JSON.stringify(result, undefined, 2));
  }
}
