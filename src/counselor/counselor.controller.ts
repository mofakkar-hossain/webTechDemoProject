// src/counselor/counselor.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { LoginCounselorDto } from './dto/login-counselor.dto';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { RequestStatus } from './entities/consultation-request.entity';
import { ConsultationStatus } from './entities/consultation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('counselors')
export class CounselorController {
  constructor(private readonly counselorService: CounselorService) {}

  // Authentication endpoints
  @Post('register')
  async register(@Body() createCounselorDto: CreateCounselorDto) {
    return await this.counselorService.register(createCounselorDto);
  }

  @Post('login')
  async login(@Body() loginCounselorDto: LoginCounselorDto) {
    return await this.counselorService.login(loginCounselorDto);
  }

  // Profile endpoints
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.counselorService.getProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateCounselorDto: UpdateCounselorDto,
  ) {
    return await this.counselorService.updateProfile(
      req.user.sub,
      updateCounselorDto,
    );
  }

  // Specialization endpoints
  @UseGuards(JwtAuthGuard)
  @Post('specializations')
  async addSpecialization(
    @Request() req,
    @Body() createSpecializationDto: CreateSpecializationDto,
  ) {
    return await this.counselorService.addSpecialization(
      req.user.sub,
      createSpecializationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('specializations')
  async getSpecializations(@Request() req) {
    return await this.counselorService.getSpecializations(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('specializations/:id')
  async removeSpecialization(
    @Request() req,
    @Param('id') specializationId: string,
  ) {
    return await this.counselorService.removeSpecialization(
      req.user.sub,
      specializationId,
    );
  }

  // Consultation Request endpoints
  @UseGuards(JwtAuthGuard)
  @Get('consultation-requests')
  async getConsultationRequests(
    @Request() req,
    @Query('status') status?: RequestStatus,
  ) {
    return await this.counselorService.getConsultationRequests(
      req.user.sub,
      status,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('consultation-requests/:id')
  async updateConsultationRequest(
    @Request() req,
    @Param('id') requestId: string,
    @Body() updateDto: UpdateConsultationRequestDto,
  ) {
    return await this.counselorService.updateConsultationRequest(
      req.user.sub,
      requestId,
      updateDto,
    );
  }

  // min rate search point
  @Get('search/by-min-rate/:minRate')
  async findCounselorsByMinRate(@Param('minRate') minRate: number) {
    const counselors =
      await this.counselorService.findCounselorsByMinRate(minRate);

    return {
      status: 'success',
      message: `Found ${counselors.length} counselors with hourly rate >= $${minRate}`,
      data: counselors,
    };
  }

  // counselor by specialization
  @Get('search/by-specialization/:specialization')
  async findCounselorsBySpecialization(
    @Param('specialization') specialization: string,
  ) {
    const counselors =
      await this.counselorService.findCounselorsBySpecialization(
        specialization,
      );

    return {
      status: 'success',
      message: `Found ${counselors.length} counselors with specialization: ${specialization}`,
      data: counselors,
    };
  }

  // Consultation endpoints
  @UseGuards(JwtAuthGuard)
  @Post('consultations')
  async createConsultation(
    @Request() req,
    @Body() createConsultationDto: CreateConsultationDto,
  ) {
    return await this.counselorService.createConsultation(
      req.user.sub,
      createConsultationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('consultations')
  async getConsultations(
    @Request() req,
    @Query('status') status?: ConsultationStatus,
  ) {
    return await this.counselorService.getConsultations(req.user.sub, status);
  }

  @UseGuards(JwtAuthGuard)
  @Put('consultations/:id')
  async updateConsultation(
    @Request() req,
    @Param('id') consultationId: string,
    @Body() updateData: any,
  ) {
    return await this.counselorService.updateConsultation(
      req.user.sub,
      consultationId,
      updateData,
    );
  }

  // Dashboard endpoint
  @UseGuards(JwtAuthGuard)
  @Get('dashboard/stats')
  async getDashboardStats(@Request() req) {
    return await this.counselorService.getDashboardStats(req.user.sub);
  }
}
