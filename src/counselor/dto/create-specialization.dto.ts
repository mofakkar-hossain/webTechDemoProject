import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSpecializationDto {
  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsOptional()
  @IsString()
  country?: string;
}
