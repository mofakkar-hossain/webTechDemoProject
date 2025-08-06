import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCounsellorDto,
  LoginCouncellorDto,
} from './dto/create-counsellor.dto';
import { UpdateCounsellorDto } from './dto/update-counsellor.dto';
import { Repository } from 'typeorm';
import { Counsellor } from './entities/counsellor.entity';
import { Student } from 'src/student/entities/student.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CounsellorService {
  constructor(
    @InjectRepository(Counsellor)
    private counselorRepo: Repository<Counsellor>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    private jwtService: JwtService,
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

  async login(dto: LoginCouncellorDto): Promise<{ access_token: string }> {
    const counsellor = await this.counselorRepo.findOne({
      where: { email: dto.email },
    });
    if (!counsellor) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const isMatch = await bcrypt.compare(dto.password, counsellor.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const payload = {
      sub: counsellor.id,
      role: 'councellor',
      email: counsellor.email,
    };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
  // Removed custom InjectRepository implementation as it's now imported from @nestjs/typeorm
}
