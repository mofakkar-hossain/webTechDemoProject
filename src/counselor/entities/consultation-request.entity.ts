import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Counselor } from './counselor.entity';

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  COMPLETED = 'completed',
}

@Entity('consultation_requests')
export class ConsultationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  seekerId: string; // Reference to seeker (you'll implement this)

  @Column()
  seekerName: string; // Store seeker name for demo purposes

  @Column()
  seekerEmail: string;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column()
  field: string; // Field of study they're interested in

  @Column({ nullable: true })
  targetCountry: string;

  @Column({ nullable: true })
  targetLevel: string; // Undergraduate, Graduate, etc.

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column({ type: 'text', nullable: true })
  counselorNotes: string;

  @ManyToOne(() => Counselor, (counselor) => counselor.consultationRequests)
  counselor: Counselor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
