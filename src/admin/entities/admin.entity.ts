import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { NoticeEntity } from './notice.entity';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => NoticeEntity, notice => notice.admin, { cascade: true })
  notices: NoticeEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: true })
  isTwoFactorEnabled: boolean; 

  @Column({ nullable: true })
  twoFactorCode: string;

  @Column({ nullable: true })
  twoFactorCodeExpiry: Date;

}
