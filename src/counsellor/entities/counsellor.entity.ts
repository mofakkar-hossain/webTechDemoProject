import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Counsellor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  specialization: string;

  @OneToMany(() => Appointment, (appointment) => appointment.counsellor)
  appointments: Appointment[];

  @OneToMany(() => Student, (student) => student.counselor)
  assignedStudents: Student[];
}
