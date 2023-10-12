import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { config } from './common/config';
import { WebModule } from './web.module';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('test-01')
    .setVersion(config.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.webPort);
}

bootstrap();
