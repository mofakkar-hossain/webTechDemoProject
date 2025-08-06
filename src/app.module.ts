import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SeekerModule } from './seeker/seeker.module';
import { CounsellorModule } from './counsellor/counsellor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { StudentModule } from './student/student.module';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
