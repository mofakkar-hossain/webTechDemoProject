import { Injectable, NotFoundException } from '@nestjs/common';
import { createSeekerDto } from './dto/CreateSeeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeekerEntity } from './entity/seeker.entity';
import { Repository } from 'typeorm';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Injectable()
export class SeekerService {

  constructor(@InjectRepository(SeekerEntity)private seekerRepo: Repository<SeekerEntity>) {}

  getScholarships() {
    return ['S1', 'S2', 'S2'];
  }
  searchScholarships(ScholarshipName: string) {
    return { messege: 'Search for Schoalrships', ScholarshipName };
  }
  createApplication(data: any) {
    return { messege: 'New application cretaed', data };
  }
  updateApplication(id: string, data: any) {
    return { message: 'Application with id ${id} updated', data };
  }
  filterScholarships(country: string, degree: string) {
    return {
      message: 'Filtered scholarships',
      filters: { country, degree },
    };
  }
  deleteApplication(id: string) {
    return { message: 'Deleted application', id };
  }

  // createSeeker(CreateSeekerDto: createSeekerDto): string {
  //   const { name, email, password, phone } = CreateSeekerDto;
  //   return 
  //   'User created: ${name} (${email}) ${password} ${phone}';
  // }

  createSeeker(dto: createSeekerDto) {
    const seeker = this.seekerRepo.create({ ...dto });
    return this.seekerRepo.save(seeker);
  }

 async updateStatus(id: number, dto: UpdateStatusDto): Promise<SeekerEntity> {
    await this.seekerRepo.update(id, { status: dto.status });
    const updated = await this.seekerRepo.findOneBy({ id });

    if (!updated) {
      throw new NotFoundException(`Seeker with ID ${id} not found`);
    }
    return updated;
  }

  getInactive() {
    return this.seekerRepo.find({ where: { status: 'inactive' } });
  }

  getOlderThan40() {
    return this.seekerRepo
      .createQueryBuilder('seeker')
      .where('seeker.age > :age', { age: 40 })
      .getMany();
  }

}
