import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportRepository.create({
      ...reportDto,
      user,
    });
    return this.reportRepository.save(report);
  }
}
