/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email:string, password:string){
        //see if email is already in use
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('Email already in use')
        }
        //Hash the users password
        //Generate salt
        const salt = randomBytes(8).toString('hex');

        //Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        //Create a new user and save it

        //Return the user
    }

    signin(){

    }
}
