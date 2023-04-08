import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../student/student.entity";

@Entity()
export class Mark{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    score: number;

    @ManyToOne(()=> Student, student => student.marks)
    student: Student;
}