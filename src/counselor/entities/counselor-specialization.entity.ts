import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Counselor } from './counselor.entity';

@Entity('counselor_specializations')
export class CounselorSpecialization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  field: string;

  @Column()
  level: string;

  @Column({ nullable: true })
  country: string;

  @ManyToOne(() => Counselor, (counselor) => counselor.specializations)
  counselor: Counselor;

  @CreateDateColumn()
  createdAt: Date;
}
