import { IsNotEmpty, IsString, MaxLength, IsBoolean, IsOptional} from 'class-validator';

export class CreateAdminDto 
{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    fullName: string

    @IsOptional()
    @IsBoolean()
    isActive?: boolean; 
}