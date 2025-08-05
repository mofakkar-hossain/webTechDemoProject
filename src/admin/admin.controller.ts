import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Controller('admin')
export class AdminController 
{
    constructor(private readonly adminService: AdminService) {}

    @Post('createAdmin')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createAdmin(@Body() dto: CreateAdminDto) 
    {
        return this.adminService.createAdmin(dto);
    }
    
    @Get('allAdmin')
    getAllAdmin()
    {
        return this.adminService.getAllAdmin();
    }

    @Get('search')
    findByFullNameSubstring(@Query('name') name: string) 
    {
        return this.adminService.findByFullNameSubstring(name);
    }

    @Get(':userName')
    getByUserName(@Param('userName') userName: string) 
    {
        return this.adminService.getByUserName(userName);
    }

    @Delete(':userName')
    removeByUserName(@Param('userName') userName: string) 
    {
        return this.adminService.removeByUserName(userName);
    }

}
