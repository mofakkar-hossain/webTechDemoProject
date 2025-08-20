import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Counselor } from './counselor.entity';

export enum ConsultationType {
  CHAT = 'chat',
  VIDEO_CALL = 'video_call',
  EMAIL = 'email',
}

export enum ConsultationStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  seekerId: string;

  @Column()
  seekerName: string;

  @Column({
    type: 'enum',
    enum: ConsultationType,
    default: ConsultationType.CHAT,
  })
  type: ConsultationType;

  @Column({
    type: 'enum',
    enum: ConsultationStatus,
    default: ConsultationStatus.SCHEDULED,
  })
  status: ConsultationStatus;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ type: 'int', default: 60 }) // Duration in minutes
  duration: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fee: number;

  @ManyToOne(() => Counselor, (counselor) => counselor.consultations)
  counselor: Counselor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
