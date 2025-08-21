import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SeekerEntity } from 'src/seeker/entity/seeker.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(SeekerEntity)
    private seekerRepo: Repository<SeekerEntity>
  ) {}

  async login(id: number, password: string) {
    const seeker = await this.seekerRepo.findOneBy({ id });

    if (!seeker) {
      throw new UnauthorizedException('Invalid id or password');
    }

    const isMatch = await bcrypt.compare(password, seeker.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid id or password');
    }

    const payload = {
      sub: seeker.id,
      fullName: seeker.fullName,
      email: seeker.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }

}
