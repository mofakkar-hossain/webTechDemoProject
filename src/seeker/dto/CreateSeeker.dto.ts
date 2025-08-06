import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class createSeekerDto {
  // @IsNotEmpty()
  // @Matches(/^[A-Za-z ]+$/, {message: 'Name must only contain letters and spaces'})
  // name: string;
  // @IsEmail()
  // @Matches(/@aiub\.edu$/, {message: 'Email must be a valid AIUB address ending with @aiub.edu'})
  // email: string;
  // @MinLength(6, { message: 'Invalid Password!'})
  // @Matches(/.*[a-z].*/, {message: 'Invalid Password!'})
  // password: string;
  // @Matches(/^01\d{9}$/, {message: 'Phone number must start with 01 and be 11 digits'})
  // phone: string;
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsInt()
  @Min(0)
  age: number;
}
