import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCounsellorDto } from './dto/create-counsellor.dto';
import { UpdateCounsellorDto } from './dto/update-counsellor.dto';
import { Repository } from 'typeorm';
import { Counsellor } from './entities/counsellor.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class CounsellorService {
  constructor(
    @InjectRepository(Counsellor)
    private counselorRepo: Repository<Counsellor>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  create(createCounsellorDto: CreateCounsellorDto) {
    const counsellor = this.counselorRepo.create(createCounsellorDto);
    return this.counselorRepo.save(counsellor);
  }

  findAll() {
    return this.counselorRepo.find({
      relations: ['appointments', 'assignedStudents'],
    });
  }

  findOne(id: number) {
    return this.counselorRepo.findOne({
      where: { id },
      relations: ['appointments', 'assignedStudents'],
    });
  }
  async assignStudent(counselorId: number, studentId: number): Promise<string> {
    const counselor = await this.counselorRepo.findOne({
      where: { id: counselorId },
    });
    if (!counselor) {
      throw new NotFoundException(`Counselor with ID ${counselorId} not found`);
    }

    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    student.counselor = counselor;
    await this.studentRepo.save(student);

    return `Student ${student.name} has been assigned to Counselor ${counselor.name}`;
  }
  // Removed custom InjectRepository implementation as it's now imported from @nestjs/typeorm
}
