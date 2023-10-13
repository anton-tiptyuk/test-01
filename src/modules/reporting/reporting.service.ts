import { Injectable } from '@nestjs/common';

import { DbLayerService } from '../db-layer/db-layer.service';

@Injectable()
export class ReportingService {
  constructor(private readonly dbLayerService: DbLayerService) {}

  report() {
    return this.dbLayerService.queryReport();
  }
}
