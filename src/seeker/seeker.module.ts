import { Module } from '@nestjs/common';
import { SeekerController } from './seeker.controller';
import { SeekerService } from './seeker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerEntity } from './entity/seeker.entity';
//import { UniversityEntity } from './entity/university.entity';

@Module({
   imports: [ TypeOrmModule.forFeature([SeekerEntity]),],
  controllers: [SeekerController],
  providers: [SeekerService]
})
export class SeekerModule {}
