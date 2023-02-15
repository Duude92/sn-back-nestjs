/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { UrlContents } from 'src/posts/urlcontent.entity';
import { Repository } from 'typeorm';
import path, { extname } from 'path';
import * as objectHash from 'object-hash';

const DEFAULT_FOLDER = 'd:/eben/';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(UrlContents) private content: Repository<UrlContents>,
  ) {}

  getContent(filename: string) {
    const file = fs.createReadStream(DEFAULT_FOLDER + filename);
    // const content = fs.readFileSync(DEFAULT_FOLDER + filename);
    return file;
  }
  async getContentById(id: string) {
    const urlContent = await this.content.findOneBy({ id: id });
    return this.getContent(urlContent.url);
  }
  async createContent(files: Array<Express.Multer.File>) {
    const urls = files.map((file) => {
      const filehash = objectHash(file);

      const newFileName = filehash.substr(0, filehash.length / 2);

      const ext = extname(file.originalname);

      const writeFile = fs.createWriteStream(
        DEFAULT_FOLDER + newFileName + ext,
      );
      writeFile.write(file.buffer);
      writeFile.close();
      return newFileName + ext;
    });

    return { links: urls };
  }
}
