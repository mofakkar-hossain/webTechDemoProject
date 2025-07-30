import { IsString } from 'class-validator';

export class uploadDocumentDto {
  @IsString()
  documentType: string;

  @IsString()
  remarks: string;
}