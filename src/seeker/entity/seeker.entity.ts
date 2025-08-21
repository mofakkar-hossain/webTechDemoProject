import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity('seeker')
export class SeekerEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({nullable:true})
  email: string;  

  @Column({nullable:true})
  password: string; 

  @OneToMany(() => ApplicationEntity, (application) => application.seeker)
  applications: ApplicationEntity[];
}
