import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerEntity } from 'src/seeker/entity/seeker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeekerEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'jwt_secret_key', 
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
