import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OCRResult } from 'src/ocrResult/ocr-result.entity';
import { File } from '../../upload/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Reports_uploadService {
    constructor(
        @InjectRepository(OCRResult) private ocrResultRepository: Repository<OCRResult>,
        @InjectRepository(File) private fileRepository: Repository<File>
    ){}

    async getAllFilesWithOCRResults(): Promise<{ filename: string, mimetype: string, text: string }[]> {
        const files = await this.fileRepository.createQueryBuilder('file')
          .leftJoinAndSelect('file.ocrResults', 'ocrResult')
          .select(['file.filename', 'file.mimetype', 'ocrResult.text'])
          .getMany();

        return files.map(file => ({
          filename: file.filename,
          mimetype: file.mimetype,
          text: file.ocrResults.map(result => result.text).join(', '),
        }));
      }
}