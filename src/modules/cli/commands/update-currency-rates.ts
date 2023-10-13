import { Injectable } from '@nestjs/common';

import { RateResolverService } from '@/modules/rate-resolver/rate-resolver.service';

import { AbstractCliCommand } from '../abstract-cli-command';

@Injectable()
export class UpdateCurrencyRatesCommand extends AbstractCliCommand {
  constructor(private readonly service: RateResolverService) {
    super();
  }

  invoke() {
    return this.service.pollAndUpdate();
  }
}
