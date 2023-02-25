//import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";
import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    //@Exclude() //This is used to hide the password
    password: string;

    @Column({default:true})
    isAdmin: boolean;

    @OneToMany(()=> Report, (report) => report.user, {
        cascade: true,
    })
    reports: Report[];
}