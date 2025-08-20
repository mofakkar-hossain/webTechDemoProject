import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CounselorSpecialization } from './counselor-specialization.entity';
import { ConsultationRequest } from './consultation-request.entity';
import { Consultation } from './consultation.entity';

@Entity('counselors')
export class Counselor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'number', default: 0 })
  yearsOfExprience: number;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => CounselorSpecialization,
    (specialization) => specialization.counselor,
  )
  specializations: CounselorSpecialization[];

  @OneToMany(() => ConsultationRequest, (request) => request.counselor)
  consultationRequests: ConsultationRequest[];

  @OneToMany(() => Consultation, (consultation) => consultation.counselor)
  consultations: Consultation[];
}
