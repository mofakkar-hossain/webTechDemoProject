import { IsNotEmpty, Matches, IsString, IsDateString, IsUrl,} 
from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must not contain numbers or symbols' })
  name: string;

  @IsNotEmpty()
  @Matches(/.*[@#$&].*/, {
    message: 'Password must contain at least one special character (@, #, $ or &)',
  })
  password: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Invalid date format. Must be a valid date.' })
  joiningDate: string;

  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid social media URL format' })
  socialLink: string;
}
