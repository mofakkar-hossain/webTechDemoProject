import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Counsellor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = bcrypt.genSaltSync();
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }

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
