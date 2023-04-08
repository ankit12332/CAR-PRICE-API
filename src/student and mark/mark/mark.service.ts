import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student/student.entity';
import { CreateMarkDto } from './dtos/create-mark.dto';
import { Mark } from './mark.entity';

@Injectable()
export class MarkService {
    constructor(@InjectRepository(Mark) private markRepository: Repository<Mark>){}

    async create(createMarkDto: CreateMarkDto){
        const mark = new Mark();
        mark.subject = createMarkDto.subject;
        mark.score = createMarkDto.score;
        mark.student = {id: createMarkDto.studentId} as Student;

        return this.markRepository.save(mark);
    }

    async findAll(){
        // return this.markRepository.find();
       return this.markRepository.createQueryBuilder('mark')
        .leftJoinAndSelect('mark.student', 'student')
        .select(['mark.id', 'mark.subject', 'mark.score', 'student.name'])
        .getMany();
    }
}
