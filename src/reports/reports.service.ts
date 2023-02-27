import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
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

  // getAllReports(){
  //   return this.repo.find();
  // }

  getAllReports(){
    return this.repo.createQueryBuilder()
      .select('*')
      .getRawMany();
  }

  createEstimate({ make, model, lng, lat, year, milage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      // .addSelect('milage')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      // .andWhere('approved IS TRUE')
      // .groupBy('milage')
      .orderBy('ABS(milage - :milage)', 'DESC')
      .setParameters({ milage })
      .limit(3)
      .getRawMany();
  }
  
}
