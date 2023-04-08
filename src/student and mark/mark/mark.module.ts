import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { Module } from '@nestjs/common';
import { Mark } from './mark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Mark])],
    controllers: [
        MarkController, ],
    providers: [
        MarkService, ],
})
export class MarkModule {}
