import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AdminEntity } from './admin.entity';

@Entity('notice')
export class NoticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  published: boolean;   

  @ManyToOne(() => AdminEntity, admin => admin.notices, { onDelete: 'CASCADE' })
  admin: AdminEntity;
}
