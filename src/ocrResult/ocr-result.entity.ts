import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OCRResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;
}
