import { ModuleRef, NestFactory } from '@nestjs/core';

import { CliCommandInvoker } from './modules/cli';
import { CliModule } from './cli.module';

async function bootstrap() {
  const cli = await NestFactory.createApplicationContext(CliModule);

  const moduleRef = cli.get(ModuleRef);

  const [, , command, ...rest] = process.argv;

  try {
    await CliCommandInvoker(moduleRef, command, rest);
  } catch (ex) {
    console.error('Exception caught');
    console.error(ex);
  }

  await cli.close();
}

bootstrap();
