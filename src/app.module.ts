 import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { AdminModule } from './admin/admin.module';
 import { SeekerModule } from './seeker/seeker.module';
 @Module({
 imports: [AdminModule, SeekerModule, TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: '4613',
 database: 'project',//Change to your database name
 autoLoadEntities: true,
 synchronize: true,
 } ),
 ],
 controllers: [],
 providers: [],
 })
 export class AppModule {}