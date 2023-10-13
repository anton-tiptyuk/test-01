import { DbLayerModule } from './modules/db-layer/db-layer.module';
import { DumpLoaderModule } from './modules/dump-loader/dump-loader.module';
import { RateResolverModule } from './modules/rate-resolver/rate-resolver.module';
import { ReportingModule } from './modules/reporting/reporting.module';

export const modules = [
  DbLayerModule,
  DumpLoaderModule,
  ReportingModule,
  RateResolverModule,
];
