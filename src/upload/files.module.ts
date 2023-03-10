import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    controllers: [
        FilesController, ],
    providers: [
        FilesService, ],
})
export class FilesModule {}
