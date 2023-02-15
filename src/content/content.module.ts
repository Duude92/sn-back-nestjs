import { ContentService } from './content.service';
import { ContentController } from './content.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlContents } from 'src/posts/urlcontent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlContents])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
