import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { JoiValidationPipe } from '@/common/nest/joi-validation-pipe';

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
        fixedRates: {
          type: 'boolean',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body('fixedRates', JoiValidationPipe.booleanPipe((x) => x.required()))
    fixedRates: boolean,
  ) {
    await this.service.load(file.buffer.toString(), fixedRates);
  }
}
