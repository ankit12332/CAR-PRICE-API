import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dtos/createFile.dto';
import { File } from './file.entity';

@Injectable()
export class FilesService {
constructor( @InjectRepository(File) private repo: Repository<File> ){}

async create(createFileDto: CreateFileDto): Promise<File> {
    const file = new File();
    file.filename = createFileDto.filename;
    file.mimetype = createFileDto.mimetype;
    file.size = createFileDto.size;
    file.data = createFileDto.data;

    return this.repo.save(file);
  }
}
