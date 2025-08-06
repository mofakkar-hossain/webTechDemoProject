import { Counsellor } from 'src/counsellor/entities/counsellor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class Student {
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
  resumeUrl: string;

  @Column({ nullable: true })
  sopUrl: string;

  @ManyToOne(() => Counsellor, (counselor) => counselor.assignedStudents, {
    nullable: true,
  })
  counselor: Counsellor;
}
