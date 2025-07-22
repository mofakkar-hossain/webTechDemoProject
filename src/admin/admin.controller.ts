import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { CreateCounsellorDto } from './dtos/createCounsellor.dto'; 

@Controller('admin')
export class AdminController {

    @Get('counsellor')
    getAllCounsellors() {
        return { message: 'Lists all the counsellors in the database' };
    }

    @Get('counsellor/search')
    searchCounsellors(@Query('name') name: string) {
        return { message: `Searching counsellors with named: ${name}` };
    }

    @Get('counsellor/:counsellorId')
    getCounsellorById(@Param('counsellorId') counsellorId: string) {
        return { message: `Retrieves a counsellor based on id: ${counsellorId}` };
    }

    @Post('counsellor')
    createCounsellor(@Body() data: CreateCounsellorDto) {
        return { data };
    }

    @Put('counsellor/:counsellorId')
    updateCounsellor(
        @Param('counsellorId') counsellorId: string,
        @Body() data: CreateCounsellorDto
    ) {
        return { message: `Updates counsellor with id: ${counsellorId}`, data };
    }

    @Delete('counsellor/:counsellorId')
    deleteCounsellor(@Param('counsellorId') counsellorId: string) {
        return { message: `Deletes a counsellor based on id: ${counsellorId}` };
    }
    //typer
}
