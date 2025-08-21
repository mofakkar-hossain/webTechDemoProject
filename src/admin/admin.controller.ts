import { Controller, Post, Get, Put, Delete, Param, Body, UsePipes, ValidationPipe, UseGuards, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/createAdmin.dto';
import { CreateNoticeDto } from './dtos/createNotice.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Post(':id/notices')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createNotice(@Param('id') id: number, @Body() dto: CreateNoticeDto) {
    return this.adminService.createNotice(id, dto);
  }

  @Get(':id/notices')
  @UseGuards(JwtAuthGuard)
  getNotices(@Param('id') id: number) {
    return this.adminService.getNotices(id);
  }

  @Put('notices/:noticeId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  updateNotice(@Param('noticeId') id: number, @Body() dto: CreateNoticeDto) {
    return this.adminService.updateNotice(id, dto);
  }

  @Patch('notices/:noticeId/publish')
  @UseGuards(JwtAuthGuard)
  toggleNoticePublish(@Param('noticeId') id: number) {
    return this.adminService.toggleNoticePublish(id);
  }

  @Delete('notices/:noticeId')
  @UseGuards(JwtAuthGuard)
  deleteNotice(@Param('noticeId') id: number) {
    return this.adminService.deleteNotice(id);
  }
}
