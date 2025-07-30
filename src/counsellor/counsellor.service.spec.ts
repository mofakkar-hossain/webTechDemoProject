import { Test, TestingModule } from '@nestjs/testing';
import { CounsellorService } from './counsellor.service';
import { Injectable } from '@nestjs/common';
import { Counsellor } from './entities/counsellor.entity';
import { Repository } from 'typeorm';
import { CreateCounsellorDto } from './dto/create-counsellor.dto';

@Injectable()
export class CounselorService {
  constructor(
    @InjectRepository(Counsellor)
    private counselorRepo: Repository<Counsellor>,
  ) {}

  create(dto: CreateCounsellorDto) {
    const counselor = this.counselorRepo.create(dto);
    return this.counselorRepo.save(counselor);
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

  async assignStudent(counselorId: number, studentId: number) {
    // pseudo-logic: use relations to assign student
    // you'd get both entities and update the student.counselor field
  }
}
function InjectRepository(
  Counselor: any,
): (
  target: typeof CounselorService,
  propertyKey: undefined,
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
