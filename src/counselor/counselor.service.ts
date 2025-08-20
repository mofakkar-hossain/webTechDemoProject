import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Counselor } from './entities/counselor.entity';
import { CounselorSpecialization } from './entities/counselor-specialization.entity';
import {
  ConsultationRequest,
  RequestStatus,
} from './entities/consultation-request.entity';
import {
  Consultation,
  ConsultationStatus,
} from './entities/consultation.entity';

import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { LoginCounselorDto } from './dto/login-counselor.dto';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class CounselorService {
  constructor(
    @InjectRepository(Counselor)
    private counselorRepository: Repository<Counselor>,
    @InjectRepository(CounselorSpecialization)
    private specializationRepository: Repository<CounselorSpecialization>,
    @InjectRepository(ConsultationRequest)
    private consultationRequestRepository: Repository<ConsultationRequest>,
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    private jwtService: JwtService,
  ) {}

  async register(createCounselorDto: CreateCounselorDto) {
    const existingCounselor = await this.counselorRepository.findOne({
      where: { email: createCounselorDto.email },
    });

    if (existingCounselor) {
      throw new ConflictException('Counselor with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createCounselorDto.password,
      saltRounds,
    );

    const counselor = this.counselorRepository.create({
      ...createCounselorDto,
      password: hashedPassword,
    });

    const savedCounselor = await this.counselorRepository.save(counselor);

    const { password, ...result } = savedCounselor;
    return result;
  }

  async login(loginCounselorDto: LoginCounselorDto) {
    const counselor = await this.counselorRepository.findOne({
      where: { email: loginCounselorDto.email },
    });

    if (!counselor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginCounselorDto.password,
      counselor.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: counselor.id,
      email: counselor.email,
      type: 'counselor',
    };
    const token = this.jwtService.sign(payload);

    const { password, ...result } = counselor;
    return {
      counselor: result,
      access_token: token,
    };
  }

  async getProfile(counselorId: string) {
    const counselor = await this.counselorRepository.findOne({
      where: { id: counselorId },
      relations: ['specializations'],
    });

    if (!counselor) {
      throw new NotFoundException('Counselor not found');
    }

    const { password, ...result } = counselor;
    return result;
  }

  async updateProfile(
    counselorId: string,
    updateCounselorDto: UpdateCounselorDto,
  ) {
    const counselor = await this.counselorRepository.findOne({
      where: { id: counselorId },
    });

    if (!counselor) {
      throw new NotFoundException('Counselor not found');
    }

    Object.assign(counselor, updateCounselorDto);
    const updatedCounselor = await this.counselorRepository.save(counselor);

    const { password, ...result } = updatedCounselor;
    return result;
  }

  // Specializations
  async addSpecialization(
    counselorId: string,
    createSpecializationDto: CreateSpecializationDto,
  ) {
    const counselor = await this.counselorRepository.findOne({
      where: { id: counselorId },
    });

    if (!counselor) {
      throw new NotFoundException('Counselor not found');
    }

    const specialization = this.specializationRepository.create({
      ...createSpecializationDto,
      counselor,
    });

    return await this.specializationRepository.save(specialization);
  }

  async getSpecializations(counselorId: string) {
    return await this.specializationRepository.find({
      where: { counselor: { id: counselorId } },
    });
  }

  async removeSpecialization(counselorId: string, specializationId: string) {
    const specialization = await this.specializationRepository.findOne({
      where: { id: specializationId, counselor: { id: counselorId } },
    });

    if (!specialization) {
      throw new NotFoundException('Specialization not found');
    }

    await this.specializationRepository.remove(specialization);
    return { message: 'Specialization removed successfully' };
  }

  // Consultation Requests
  async getConsultationRequests(counselorId: string, status?: RequestStatus) {
    const where: any = { counselor: { id: counselorId } };
    if (status) {
      where.status = status;
    }

    return await this.consultationRequestRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async updateConsultationRequest(
    counselorId: string,
    requestId: string,
    updateDto: UpdateConsultationRequestDto,
  ) {
    const request = await this.consultationRequestRepository.findOne({
      where: { id: requestId, counselor: { id: counselorId } },
    });

    if (!request) {
      throw new NotFoundException('Consultation request not found');
    }

    Object.assign(request, updateDto);
    return await this.consultationRequestRepository.save(request);
  }

  // Consultations
  async createConsultation(
    counselorId: string,
    createConsultationDto: CreateConsultationDto,
  ) {
    // First, get the consultation request
    const request = await this.consultationRequestRepository.findOne({
      where: {
        id: createConsultationDto.consultationRequestId,
        counselor: { id: counselorId },
        status: RequestStatus.ACCEPTED,
      },
    });

    if (!request) {
      throw new NotFoundException('Accepted consultation request not found');
    }

    // Create consultation
    const consultation = this.consultationRepository.create({
      ...createConsultationDto,
      counselor: { id: counselorId } as Counselor,
      seekerId: request.seekerId,
      seekerName: request.seekerName,
    });

    const savedConsultation =
      await this.consultationRepository.save(consultation);

    // Update request status to completed
    request.status = RequestStatus.COMPLETED;
    await this.consultationRequestRepository.save(request);

    return savedConsultation;
  }

  async getConsultations(counselorId: string, status?: ConsultationStatus) {
    const where: any = { counselor: { id: counselorId } };
    if (status) {
      where.status = status;
    }

    return await this.consultationRepository.find({
      where,
      order: { scheduledAt: 'ASC' },
    });
  }

  async updateConsultation(
    counselorId: string,
    consultationId: string,
    updateData: Partial<Consultation>,
  ) {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId, counselor: { id: counselorId } },
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    Object.assign(consultation, updateData);
    return await this.consultationRepository.save(consultation);
  }

  // Dashboard stats
  async getDashboardStats(counselorId: string) {
    const [
      totalRequests,
      pendingRequests,
      acceptedRequests,
      totalConsultations,
      completedConsultations,
    ] = await Promise.all([
      this.consultationRequestRepository.count({
        where: { counselor: { id: counselorId } },
      }),
      this.consultationRequestRepository.count({
        where: {
          counselor: { id: counselorId },
          status: RequestStatus.PENDING,
        },
      }),
      this.consultationRequestRepository.count({
        where: {
          counselor: { id: counselorId },
          status: RequestStatus.ACCEPTED,
        },
      }),
      this.consultationRepository.count({
        where: { counselor: { id: counselorId } },
      }),
      this.consultationRepository.count({
        where: {
          counselor: { id: counselorId },
          status: ConsultationStatus.COMPLETED,
        },
      }),
    ]);

    return {
      totalRequests,
      pendingRequests,
      acceptedRequests,
      totalConsultations,
      completedConsultations,
    };
  }
}
