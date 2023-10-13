import { Module } from '@nestjs/common';

import { DbLayerModule } from '../db-layer/db-layer.module';
import { RateResolverModule } from '../rate-resolver/rate-resolver.module';

import { DumpLoaderService } from './dump-loader.service';
import { DumpLoaderController } from './dump-loader.controller';

@Module({
  imports: [DbLayerModule, RateResolverModule],
  providers: [DumpLoaderService],
  controllers: [DumpLoaderController],
  exports: [DumpLoaderService],
})
export class DumpLoaderModule {}
