import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SeekerModule } from './seeker/seeker.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounselorModule } from './counselor/counselor.module';
import { Counselor } from './counselor/entities/counselor.entity';
import { CounselorSpecialization } from './counselor/entities/counselor-specialization.entity';
import { Consultation } from './counselor/entities/consultation.entity';
import { ConsultationRequest } from './counselor/entities/consultation-request.entity';

JwtModule.register({
  secret: 'trash',
  signOptions: { expiresIn: '7d' },
});
@Module({
  imports: [
    AdminModule,
    SeekerModule,
    CounselorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'avishek',
      entities: [
        Counselor,
        CounselorSpecialization,
        Consultation,
        ConsultationRequest,
      ],
      database: 'testDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CounselorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
