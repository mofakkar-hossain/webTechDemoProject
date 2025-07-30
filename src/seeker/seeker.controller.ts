import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  FileValidator,
  ParseFilePipe,
  FileTypeValidator
} from '@nestjs/common';

import { SeekerService } from './seeker.service';
import { createSeekerDto } from './dto/CreateSeeker.dto';
import { uploadDocumentDto } from './dto/UploadDocumentDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('seeker')
export class SeekerController {
  constructor(private readonly SeekerService: SeekerService) {}

  @Get()
  getScholarships() {
    return this.SeekerService.getScholarships();
  }

  @Get('search')
  searchScholarships(@Query('SholarshipName') ScholarshipName: string) {
    return this.SeekerService.searchScholarships(ScholarshipName);
  }

  @Post('create')
  createApplication(@Body('data') data: any) {
    return this.SeekerService.createApplication(data);
  }

  @Put(':id')
  updateAdmin(@Param('id') id: string, @Body() data: any) {
    return this.SeekerService.updateApplication(id, data);
  }

  @Get('filter/by-country-degree')
  filter(@Query('country') country: string, @Query('degree') degree: string) {
    return this.SeekerService.filterScholarships(country, degree);
  }

  @Delete(':id')
  deleteApplication(@Param('id') id: string) {
    return this.SeekerService.deleteApplication(id);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto: createSeekerDto) {
    return this.SeekerService.createSeeker(dto);
  }
 @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file) {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'No file provided'), false);
        } else if (file.originalname.match(/\.pdf$/i)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only PDF files are allowed'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, 
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        statusCode: 400,
        message: 'No file uploaded or file format is not PDF',
      };
    }

    console.log('Uploaded file:', file);
    return {
      message: 'PDF uploaded successfully',
      filename: file.filename,
    };
  }
}
