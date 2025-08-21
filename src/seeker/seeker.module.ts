import { Module } from '@nestjs/common';
import { SeekerController } from './seeker.controller';
import { SeekerService } from './seeker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerEntity } from './entity/seeker.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entity/application.entity';
//import { UniversityEntity } from './entity/university.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([SeekerEntity,ApplicationEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'arifsofficials@gmail.com',
          pass: 'jrux mexg knnc nznd',
        },
      },
      defaults: {
        from: '"Scholarship Portal" <your-email@gmail.com>',
      },
    }),
  ],
  controllers: [SeekerController,ApplicationController], 
  providers: [SeekerService,ApplicationService], 
})
export class SeekerModule {}
