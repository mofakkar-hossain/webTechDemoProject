import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SeekerModule } from './seeker/seeker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './admin/auth/auth.module';

@Module({
  imports: [AdminModule,SeekerModule, TypeOrmModule.forRoot(
  { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'DemoDB',
    autoLoadEntities: true,
    synchronize: true,
  }),
  AdminModule,
  AuthModule,
],  
controllers: [],
providers: [],
})
export class AppModule {}
