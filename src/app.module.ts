 import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { AdminModule } from './admin/admin.module';
 import { SeekerModule } from './seeker/seeker.module';
 import { ApplicationModule } from './seeker/application.module';
import { AuthModule } from './seeker/auth/auth.module';
 @Module({
 imports: [AdminModule, SeekerModule,ApplicationModule,AuthModule, TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: '4613',
 database: 'project',
 autoLoadEntities: true,
 synchronize: true,
 } ),
 ],
 controllers: [],
 providers: [],
 })
 export class AppModule {}