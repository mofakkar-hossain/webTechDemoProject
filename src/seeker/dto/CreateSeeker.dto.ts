import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from 'class-validator';

export class createSeekerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  @Min(16)
  @Max(80)
  age: number;
}
