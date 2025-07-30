import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Counsellor } from 'src/counsellor/entities/counsellor.entity';
import { Student } from 'src/student/entities/student.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: Date;

  @Column({ nullable: true })
  topic: string;

  @ManyToOne(() => Student, (student) => student.id)
  student: Student;

  @ManyToOne(() => Counsellor, (counselor) => counselor.appointments)
  counsellor: Counsellor;
}
