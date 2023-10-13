import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { ReportingService } from '@/modules/reporting/reporting.service';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class ReportCommand extends AbstractCliCommand {
  constructor(private readonly service: ReportingService) {
    super();
  }

  get argNumber(): number {
    return 1;
  }

  get argList(): string[] {
    return ['destinationPath'];
  }

  async invoke(args: any[]) {
    const [destinationPath] = args;
    const result = await this.service.report();
    fs.writeFileSync(destinationPath, JSON.stringify(result, undefined, 2));
  }
}
