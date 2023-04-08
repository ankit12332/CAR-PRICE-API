import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>){}

    async create( createStudentDto: CreateStudentDto ){
        const student =  new Student();
        student.name = createStudentDto.name;
        student.email = createStudentDto.email;
        student.phone_number = createStudentDto.phone_number;
        return this.studentRepository.save(student);
    }

    async findAll(){
        return this.studentRepository.find();
    }
}
