import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { DumpLoaderService } from '@/modules/dump-loader/dump-loader.service';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class LoadDumpWithApiRatesCommand extends AbstractCliCommand {
  constructor(private readonly service: DumpLoaderService) {
    super();
  }

  get argNumber(): number {
    return 1;
  }

  get argList(): string[] {
    return ['sourcePath'];
  }

  async invoke(args: any[]) {
    const [sourcePath] = args;
    const dumpString = fs.readFileSync(sourcePath, { encoding: 'utf8' });
    await this.service.load(dumpString, false);
  }
}
