import { IsNumber, IsString } from "class-validator";

export class ViewFileDto {
  @IsNumber()
  id:number

  @IsString()
  filename: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  data: Buffer;
}
