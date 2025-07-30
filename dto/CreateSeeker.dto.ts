import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class createSeekerDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Name must only contain letters and spaces',
  })
  name: string;
  @IsEmail()
  @Matches(/@aiub\.edu$/, {
    message: 'Email must be a valid AIUB address ending with @aiub.edu',
  })
  email: string;
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/.*[a-z].*/, {message: 'Password must contain at least one lowercase letter'})
  password: string;
  @Matches(/^01\d{9}$/, {message: 'Phone number must start with 01 and be 11 digits'})
  phone: string;
}
