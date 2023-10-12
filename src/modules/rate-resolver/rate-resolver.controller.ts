import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RateResolverService } from './rate-resolver.service';

@ApiTags('rate-resolver')
@Controller('rate-resolver')
export class RateResolverController {
  constructor(private readonly service: RateResolverService) {}

  @Post('poll-and-update')
  pollAndUpdate() {
    return this.service.pollAndUpdate();
  }
}
