import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async login(username: string, password: string, twoFactorCode?: string) {
  const admin = await this.adminRepo.findOne({ where: { userName: username },select: ['id', 'userName', 'password', 'email', 'twoFactorCode', 'twoFactorCodeExpiry'], });
  if (!admin) throw new UnauthorizedException('Invalid credentials');

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new UnauthorizedException('Invalid credentials');

  if (!twoFactorCode) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    admin.twoFactorCode = code;
    admin.twoFactorCodeExpiry = new Date(Date.now() + 5 * 60 * 1000); 
    await this.adminRepo.save(admin);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Your 2 Factor Authentication Code',
      text: `Your login code is: ${code}. It expires in 5 minutes.`,
    });

    return { message: '2 Factor Authentication code sent to your email' };
  }

  if (twoFactorCode) {
    if (!admin.twoFactorCode || admin.twoFactorCode !== twoFactorCode) {
      throw new UnauthorizedException('Invalid 2FA code');
    }
    if (new Date() > admin.twoFactorCodeExpiry) {
      throw new UnauthorizedException('2FA code expired');
    }

    admin.twoFactorCode = null;
    admin.twoFactorCodeExpiry = null;
    await this.adminRepo.save(admin);
  }

  return {
    access_token: this.jwtService.sign({ sub: admin.id, username: admin.userName }),
  };
}

}
