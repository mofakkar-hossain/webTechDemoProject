import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entity/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { SeekerEntity } from 'src/seeker/entity/seeker.entity';


@Module({
imports: [TypeOrmModule.forFeature([ApplicationEntity, SeekerEntity])],
providers: [ApplicationService],
controllers: [ApplicationController],
})
export class ApplicationModule {}