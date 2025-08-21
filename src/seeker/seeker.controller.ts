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
  FileTypeValidator,
  Patch,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { SeekerService } from './seeker.service';
import { createSeekerDto } from './dto/CreateSeeker.dto';
import { uploadDocumentDto } from './dto/UploadDocumentDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateApplicationDto } from './dto/CreateApplication.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('seeker')
export class SeekerController {
  constructor(
    private readonly SeekerService: SeekerService,
    private readonly ApplicationService: ApplicationService,
  ) {}

  @Get('filter/by-country-degree')
  filter(@Query('country') country: string, @Query('degree') degree: string) {
    return this.SeekerService.filterScholarships(country, degree);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  register(@Body() dto: createSeekerDto) {
    return this.SeekerService.createSeeker(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file) {
          cb(
            new MulterError('LIMIT_UNEXPECTED_FILE', 'No file provided'),
            false,
          );
        } else if (file.originalname.match(/\.pdf$/i)) {
          cb(null, true);
        } else {
          cb(
            new MulterError(
              'LIMIT_UNEXPECTED_FILE',
              'Only PDF files are allowed',
            ),
            false,
          );
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

  @Patch(':id/status')
  @UsePipes(new ValidationPipe())
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.SeekerService.updateStatus(id, dto);
  }

  @Get('inactive')
  getInactive() {
    return this.SeekerService.getInactive();
  }

  @Post('application/:seekerId')
  @UsePipes(new ValidationPipe())
  apply(
    @Param('seekerId', ParseIntPipe) seekerId: number,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.ApplicationService.createApplication(seekerId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req) {
    return this.SeekerService.getMe(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateMe(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.SeekerService.updateMe(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.SeekerService.changePassword(req.user.id, dto);
  }
}
