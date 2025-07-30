import { Counsellor } from 'src/counsellor/entities/counsellor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

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
