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
    searchScholarships(@Query ('sname') sname:string ){
        return this.SeekerService.searchScholarships(sname);
    }

}
