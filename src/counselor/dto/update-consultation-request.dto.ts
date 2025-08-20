import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RequestStatus } from '../entities/consultation-request.entity';

export class UpdateConsultationRequestDto {
  @IsEnum(RequestStatus)
  status: RequestStatus;

  @IsOptional()
  @IsString()
  counselorNotes?: string;
}
