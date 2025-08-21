import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { NoticeEntity } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, NoticeEntity]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: false,
      secure: true,
      auth: {
        user: 'hossainmahim13@gmail.com',
        pass: 'zhkn bxsm vtuj pkxi'
      },
    },
  }),
  AuthModule,
],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
