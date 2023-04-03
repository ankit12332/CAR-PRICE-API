import { OCRResult } from 'src/ocrResult/ocr-result.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column('bytea')
  data: Buffer;

  @OneToMany(() => OCRResult, result => result.file)
  ocrResults: OCRResult[];
}
