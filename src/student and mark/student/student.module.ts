import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Module } from '@nestjs/common';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    controllers: [
        StudentController, ],
    providers: [
        StudentService, ],
})
export class StudentModule {}