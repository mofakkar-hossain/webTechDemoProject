import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ConsultationType } from '../entities/consultation.entity';

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsString()
  consultationRequestId: string;

  @IsEnum(ConsultationType)
  type: ConsultationType;

  @IsOptional()
  @IsDateString()
  scheduledAt?: Date;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  fee?: number;
}
