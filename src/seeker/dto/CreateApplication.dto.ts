import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  scholarshipTitle: string;

  @IsString()
  @IsNotEmpty()
  institution: string;
}
