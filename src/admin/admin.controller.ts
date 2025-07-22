import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getAdmins() {
        return this.adminService.getAdmins();
    }

    @Get('search')
    searchAdmin(@Query('name') name: string) {
        return this.adminService.searchAdmin(name);
    }

    @Get(':id')
    getAdminById(@Param('id') id: string) {
        return this.adminService.getAdminById(id);
    }

    @Post()
    createAdmin(@Body() data: any) {
        return this.adminService.createAdmin(data);
    }

    @Put(':id')
    updateAdmin(@Param('id') id: string, @Body() data: any) {
        return this.adminService.updateAdmin(id, data);
    }

    @Delete(':id')
    deleteAdmin(@Param('id') id: string) {
        return this.adminService.deleteAdmin(id);
    }
}
