import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class AdminService 
{
  constructor(@InjectRepository(AdminEntity)private readonly adminRepo: Repository<AdminEntity>,) {}

  async createAdmin(dto: CreateAdminDto): Promise<AdminEntity> 
  {
    const exists = await this.adminRepo.findOne({ where: { userName: dto.userName } });
    if (exists) throw new ConflictException('Username already exists');
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }

  async findByFullNameSubstring(substring: string): Promise<AdminEntity[]> 
  {
    return this.adminRepo.find({ where: { fullName: Like(`%${substring}%`) } });
  }

  async getByUserName(userName: string): Promise<AdminEntity> 
  {
    const admin = await this.adminRepo.findOne({ where: { userName } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async removeByUserName(userName: string): Promise<{message:string}> 
  {
    const admin = await this.adminRepo.findOne({ where: { userName } });
    if (!admin) throw new NotFoundException('Admin not found');
    await this.adminRepo.remove(admin);
    return { message: `Admin ${userName} removed` };
  }

  async getAllAdmin(): Promise<AdminEntity[]>
  {
    return this.adminRepo.find();
  }
}


