import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CounselorController } from './counselor.controller';
import { CounselorService } from './counselor.service';
import { Counselor } from './entities/counselor.entity';
import { CounselorSpecialization } from './entities/counselor-specialization.entity';
import { ConsultationRequest } from './entities/consultation-request.entity';
import { Consultation } from './entities/consultation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Counselor,
      CounselorSpecialization,
      ConsultationRequest,
      Consultation,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CounselorController],
  providers: [CounselorService],
  exports: [CounselorService],
})
export class CounselorModule {}
