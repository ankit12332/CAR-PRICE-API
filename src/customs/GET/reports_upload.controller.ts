import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Reports_uploadService } from './reports_upload.service';

@Controller('reports_upload')
export class Reports_uploadController {
    constructor(private readonly reports_uploadService: Reports_uploadService){}

  @Get()
  async getOCRFileData() {
    return this.reports_uploadService.getAllFilesWithOCRResults();
  }
}