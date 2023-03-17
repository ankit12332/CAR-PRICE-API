import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OCRResult } from './ocr-result.entity';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OCRResultService {
  constructor(
    @InjectRepository(OCRResult)
    private ocrResultRepository: Repository<OCRResult>,
  ) {}

  async create(imageBuffer: Buffer): Promise<OCRResult> {
    const worker = await Tesseract.createWorker({
      langPath: 'eng.traineddata',
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data } = await worker.recognize(imageBuffer);

    await worker.terminate();

    const ocrResult = new OCRResult();
    ocrResult.text = data.text;
    return this.ocrResultRepository.save(ocrResult);
  }

  async findAll(): Promise<OCRResult[]> {
    return this.ocrResultRepository.find();
  }
}