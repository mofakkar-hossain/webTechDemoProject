import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('users')
    getAllUsers(@Query('role') role?: string) {
        return this.adminService.getAllUsers(role);
    }

    @Get('user/:id')
    getUserById(@Param('id') id: string) {
      return this.adminService.getUserById(id);
    }

  
    @Post('add-user')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    addUser(@Body() userData: CreateAdminDto) 
    {
        return this.adminService.addUser(userData);
    }


    @Put('user/:id')
    updateUser(@Param('id') id: string, @Body() data: any) {
        return this.adminService.updateUser(id, data);
    }

    @Patch('user/:id/role')
    changeUserRole(@Param('id') id: string, @Body('role') role: string) {
        return this.adminService.changeUserRole(id, role);
    }

    @Delete('user/:id')
    removeUser(@Param('id') id: string) {
        return this.adminService.removeUser(id);
    }
}
