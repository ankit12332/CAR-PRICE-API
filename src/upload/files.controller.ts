import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dtos/createFile.dto';
import { File } from './file.entity';
import { FilesService } from './files.service';
import { Response } from 'express';
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

    @Get()
    async findAll(@Res() res: Response): Promise<void> {
      const files = await this.filesService.findAll();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(files);
    }

    @Get(':id')
    async getFileById(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const file = await this.filesService.getFileById(id);
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
    res.send(file.data);
  }
}
