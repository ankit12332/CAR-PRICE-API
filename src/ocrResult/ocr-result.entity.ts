import { File } from '../upload/file.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OCRResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => File, (file) => file.ocrResults)
  file: File;
}
