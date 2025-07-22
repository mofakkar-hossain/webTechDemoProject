import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SeekerModule } from './seeker/seeker.module';

@Module({
  imports: [AdminModule,SeekerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
