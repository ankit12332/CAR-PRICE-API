import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMarkDto {
    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsNumber()
    score: number;
    
    @IsNotEmpty()
    @IsNumber()
    studentId: number;
  }