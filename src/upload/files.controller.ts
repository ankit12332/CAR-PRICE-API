import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dtos/createFile.dto';
import { File } from './file.entity';
import { FilesService } from './files.service';
import { Request } from 'express';
import * as multer from 'multer';
import type { Multer } from 'multer';

@Controller('file')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    // ------------------------------------- Upload File in BLOB Storages ------------------------------------- //
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Multer.File): Promise<File> {
      const createFileDto: CreateFileDto = {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        data: file.buffer,
      };
  
      return this.filesService.create(createFileDto);
    }
}
