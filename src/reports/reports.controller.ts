import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
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

    @Patch(':id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id:number, @Body() body:ApprovedReportDto){
        return this.reportsService.changeApproval(id, body.approved);
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    getAllReport(){
        return this.reportsService.getAllReports();
    }

    @Get('/getEstimate')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    getEstimate(@Query() query:GetEstimateDto){
        return this.reportsService.createEstimate(query);
        // console.log(query);
    }
}
