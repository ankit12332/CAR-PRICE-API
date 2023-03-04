import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  mimetype: string;

  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  data: Buffer;
}
