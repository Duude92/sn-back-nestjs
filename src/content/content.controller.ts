/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StreamableFile } from '@nestjs/common/file-stream';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContentService } from './content.service';

@Controller('api/content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('/:filename')
  async get(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const fileStream = this.contentService.getContent(filename);
    const file = new StreamableFile(fileStream, {});
    return file;
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async post(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    return await this.contentService.createContent(files);

  }
}
