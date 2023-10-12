import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from '@/common/config';

import {
  CurrencyRate,
  Department,
  Donation,
  Employee,
  Statement,
} from '@/db/models';

import { DbLayerService } from './db-layer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.dbConfig),
    TypeOrmModule.forFeature([
      CurrencyRate,
      Department,
      Donation,
      Employee,
      Statement,
    ]),
  ],
  providers: [DbLayerService],
  exports: [DbLayerService],
})
export class DbLayerModule {}
