import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";
import { SeekerService } from "./seeker.service";
@Controller('seeker')
export class SeekerController {
    constructor(private readonly SeekerService:SeekerService) {}
    @Get()
    getScholarships(){
        return this.SeekerService.getScholarships();
    }
    @Get('search')
    searchScholarships(@Query ('sname') ScholarshipName:string ){
        return this.SeekerService.searchScholarships(ScholarshipName);
    }
    @Post('create')
    createApplication(@Body('data') data:any){
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
    


}
