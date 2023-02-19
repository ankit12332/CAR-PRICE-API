import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto, @CurrentUser() user:User){
        return this.reportsService.createReport(body, user);
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllReport(){
        return this.reportsService.getAllReports();
    }
}
