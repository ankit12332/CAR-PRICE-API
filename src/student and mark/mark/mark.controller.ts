import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMarkDto } from './dtos/create-mark.dto';
import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController {
    constructor(private readonly markService: MarkService){}

    @Post()
    async create(@Body() createMarkDto: CreateMarkDto){
        return this.markService.create(createMarkDto);
    }

    @Get()
    async findAll(){
        return this.markService.findAll();
    }
}
