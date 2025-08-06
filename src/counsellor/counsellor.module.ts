import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counsellor } from './entities/counsellor.entity';
import { CounsellorService } from './counsellor.service';
import { CounsellorController } from './counsellor.controller';
import { StudentModule } from 'src/student/student.module';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Counsellor, Student])],
  providers: [CounsellorService, JwtService],
  controllers: [CounsellorController],
  exports: [CounsellorService],
})
export class CounsellorModule {}
