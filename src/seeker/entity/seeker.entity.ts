import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seeker')
export class SeekerEntity {

  @PrimaryGeneratedColumn({unsigned:true})
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({ type: 'varchar', default: 'active' })
  status: string;
}
