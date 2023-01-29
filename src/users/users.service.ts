import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string){
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    findOne(id:number){
        return this.repo.findOne({where:{id}})
    }

    find(email:string){
        return this.repo.find({where:{email}}); 
    }

    async update(id: number, attrs: Partial<User>){  //attrs means attributes, Partial means an object that can have any subset of properties of the 'User'
        const user = await this.repo.findOne({where:{id}});
        if(!user){
            throw new Error('User not found');
        }
        Object.assign(user, attrs); //if user found then take all  the properties of "attrs" to "user" by using "Object.assign"
        return this.repo.save(user)
    }

    async remove(id: number){
        const user = await this.repo.findOne({where:{id}})
        if(!user){
            throw new Error('User not found');
        }
        return this.repo.remove(user)
    }
}
