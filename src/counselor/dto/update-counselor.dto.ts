import { PartialType } from '@nestjs/mapped-types';
import { CreateCounselorDto } from './create-counselor.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCounselorDto extends PartialType(CreateCounselorDto) {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  certifications?: string;

  @IsOptional()
  @IsNumber()
  hourlyRate?: number;
}
