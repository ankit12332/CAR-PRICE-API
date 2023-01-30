import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpadateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body); //For testing whether the create req is working on not in console
        this.usersService.create(body.email, body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor) //It's used to hide the password which we defined in user.entity.ts
    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findUsers(@Query('email') email:string){
        return this.usersService.find(email);
        
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpadateUserDto){
        return this.usersService.update(parseInt(id), body)
    }
}
