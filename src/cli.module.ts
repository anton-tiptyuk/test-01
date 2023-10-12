import { Module } from '@nestjs/common';

import { modules } from './modules';
import { commands } from './modules/cli';

@Module({
  imports: [...modules],
  providers: commands,
})
export class CliModule {}
