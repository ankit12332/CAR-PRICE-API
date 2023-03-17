import { OcrResultController } from './ocr-result.controller';
import { OCRResultService } from './ocr-result.service';
import { Module } from '@nestjs/common';
import { OCRResult } from './ocr-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([OCRResult])],
    controllers: [
        OcrResultController, ],
    providers: [
        OCRResultService, ],
})
export class OcrResultModule {}
