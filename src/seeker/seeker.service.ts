import { Injectable } from "@nestjs/common";

@Injectable()
export class SeekerService {
     getScholarships() {
    return ['S1', 'S2', 'S2'];
    }
    searchScholarships(Sname:string){
        return{ messege: 'Search for Schoalrships',Sname}
    }

}
 