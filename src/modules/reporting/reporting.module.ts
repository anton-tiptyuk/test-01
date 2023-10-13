import { Module } from '@nestjs/common';

import { DbLayerModule } from '../db-layer/db-layer.module';

import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';

@Module({
  imports: [DbLayerModule],
  providers: [ReportingService],
  controllers: [ReportingController],
  exports: [ReportingService],
})
export class ReportingModule {}
