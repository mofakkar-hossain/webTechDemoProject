import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCounselorDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
