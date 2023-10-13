import { Module } from '@nestjs/common';

import { RateResolverService } from './rate-resolver.service';
import { RateResolverController } from './rate-resolver.controller';

import { DbLayerModule } from '../db-layer/db-layer.module';

@Module({
  imports: [DbLayerModule],
  providers: [RateResolverService],
  controllers: [RateResolverController],
  exports: [RateResolverService],
})
export class RateResolverModule {}
