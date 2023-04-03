import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OCRResult } from 'src/ocrResult/ocr-result.entity';
import { File } from 'src/upload/file.entity';
import { Reports_uploadController } from './reports_upload.controller';
import { Reports_uploadService } from './reports_upload.service';

@Module({
    imports: [TypeOrmModule.forFeature([OCRResult, File])],
    controllers: [Reports_uploadController],
    providers: [Reports_uploadService],
})
export class Reports_uploadModule {}
