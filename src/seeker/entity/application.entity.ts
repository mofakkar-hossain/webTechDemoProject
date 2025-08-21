import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SeekerEntity } from 'src/seeker/entity/seeker.entity';

@Entity('application')
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @Column()
  scholarshipTitle: string;

  @Column()
  institution: string;

  @Column()
  appliedAt: Date;

  @Column({ default: 'pending' })
  status: string;

@ManyToOne(() => SeekerEntity, seeker => seeker.applications, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'seekerId' })
seeker: SeekerEntity;

}
