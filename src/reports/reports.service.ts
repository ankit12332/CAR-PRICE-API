import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
  ) {}

  createReport(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.repo.create({
      ...reportDto,
      user,
    });
    return this.repo.save(report);
    // const report = this.repo.create(reportDto);
    // report.user = user;
    // return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({where: {id}})
    if(!report) { 
      throw new NotFoundException('report not found')
    }; 
    report.approved = approved;
    return this.repo.save(report);
}
}
