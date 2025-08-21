import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/CreateApplication.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe())
  async apply(@Body() dto: CreateApplicationDto, @Req() req) {
    const seekerId = req.user.id;

    const result = await this.appService.createApplication(seekerId, dto);

    return {
      message: 'Application submitted successfully',
      data: result,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyApplications(@Req() req) {
    const seekerId = req.user.id; 
    return this.appService.getApplicationsBySeeker(seekerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number,@Req() req) {
    return this.appService.getOneForSeeker(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/withdraw')
  withdraw(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.appService.withdraw(id, req.user.id);
  }

  @Get('seeker/:seekerId')
  getAllBySeeker(@Param('seekerId', ParseIntPipe) seekerId: number) {
    return this.appService.getApplicationsBySeeker(seekerId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteApplication(id);
  }
}
