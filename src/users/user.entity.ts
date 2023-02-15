//import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    //@Exclude() //This is used to hide the password
    password: string;
}