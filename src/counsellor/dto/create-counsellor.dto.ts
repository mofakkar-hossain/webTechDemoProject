import { IsEmail, IsOptional, isString, IsString } from 'class-validator';

export class CreateCounsellorDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  specialization?: string;
}
