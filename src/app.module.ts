import { MarkModule } from './student and mark/mark/mark.module';
import { StudentModule } from './student and mark/student/student.module';
import { Reports_uploadModule } from './customs/GET/reports_upload.module';
import { OcrResultModule } from './ocrResult/ocr-result.module';
import { FilesModule } from './upload/files.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { File } from './upload/file.entity';
import { OCRResult } from './ocrResult/ocr-result.entity';
import { Student } from './student and mark/student/student.entity';
import { Mark } from './student and mark/mark/mark.entity';

@Module({
  imports: [
    //////////////////////Localhost///////////////////////////////
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '9658',
    //   database: 'CAR-PRICE-API',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),

    //////////////////////Elephant-SQL///////////////////////////////
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'manny.db.elephantsql.com',
    //   port: 5432,
    //   username: 'mdctybfi',
    //   password: '7A6VGLjsa_oJsz4e-EPQLNS28koerC2o',
    //   database: 'mdctybfi',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),

    //////////////////////AWS-Postgress-Database Connection///////////////////////////////
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Report, File, OCRResult, Student, Mark],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'postgress-instance.culd1172xzea.ap-south-1.rds.amazonaws.com',
    //   port: 5432,
    //   username: 'ankitpanda',
    //   password: '9658523363',
    //   database: 'CARPRICEAPI',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
    FilesModule,
    OcrResultModule,
    Reports_uploadModule,
    MarkModule, 
    StudentModule, 
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
