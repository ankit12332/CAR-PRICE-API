import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post()
    async create(@Body() createStudentDto: CreateStudentDto): Promise<Student>{
        return this.studentService.create(createStudentDto);
    }

    @Get()
    async findAll(){
        return this.studentService.findAll()
    }
}
