import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { DumpLoaderService } from './dump-loader.service';

@ApiTags('dump-loader')
@Controller('dump-loader')
export class DumpLoaderController {
  constructor(private readonly service: DumpLoaderService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.service.load(file.buffer.toString());
  }
}
