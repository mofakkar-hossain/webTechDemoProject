import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SeekerModule } from './seeker/seeker.module';
import { CounsellorModule } from './counsellor/counsellor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { StudentModule } from './student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entities/student.entity';
import { Counsellor } from './counsellor/entities/counsellor.entity';
import { Appointment } from './appointment/entities/appointment.entity';

JwtModule.register({
  secret: 'trash',
  signOptions: { expiresIn: '7d' },
});
@Module({
  imports: [
    AdminModule,
    SeekerModule,
    CounsellorModule,
    AppointmentModule,
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'avishek',
      entities: [Counsellor, Student, Appointment],
      database: 'testDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
