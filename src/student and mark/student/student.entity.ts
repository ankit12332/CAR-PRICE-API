import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mark } from "../mark/mark.entity";

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;
  
    @OneToMany(() => Mark, mark => mark.student)
    marks: Mark[];
}