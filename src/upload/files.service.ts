import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dtos/createFile.dto';
import { ViewFileDto } from './dtos/viewFile.dto';
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

  async findAll(): Promise<ViewFileDto[]> {
    const files = await this.repo
      .createQueryBuilder()
      .select(['id','filename', 'mimetype', 'size'])
      .addSelect('encode(data, \'base64\')', 'data')
      .execute();

    return files.map((file) => ({
      id: file.id,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      data: file.data,
    }));
  }

  async getFileById(id: number): Promise<File> {
    const file = await this.repo.findOne({where:{id}});
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }
}
