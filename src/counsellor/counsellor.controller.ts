import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CounsellorService } from './counsellor.service';
import { CreateCounsellorDto } from './dto/create-counsellor.dto';

@Controller('counselors')
export class CounsellorController {
  constructor(private readonly counsellorService: CounsellorService) {}

  @Post()
  create(@Body() dto: CreateCounsellorDto) {
    return this.counsellorService.create(dto);
  }

  @Get()
  findAll() {
    return this.counsellorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counsellorService.findOne(+id);
  }
}
