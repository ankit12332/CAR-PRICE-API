import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OCRResultService } from './ocr-result.service';
import type { Multer } from 'multer';

@Controller('ocr-result')
export class OcrResultController {
  constructor(private ocrResultService: OCRResultService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Multer.File) {
    const buffer = Buffer.from(file.buffer);
    return this.ocrResultService.create(buffer);
  }

  @Get()
  async findAll() {
    return this.ocrResultService.findAll();
  }
}
