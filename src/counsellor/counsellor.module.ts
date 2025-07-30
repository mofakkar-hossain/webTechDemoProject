import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counsellor } from './entities/counsellor.entity';
import { CounsellorService } from './counsellor.service';
import { CounsellorController } from './counsellor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Counsellor])],
  providers: [CounsellorService],
  controllers: [CounsellorController],
  exports: [CounsellorService],
})
export class CounselorModule {}
