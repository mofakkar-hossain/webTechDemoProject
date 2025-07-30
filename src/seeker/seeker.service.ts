import { Injectable } from '@nestjs/common';
import { createSeekerDto } from './dto/CreateSeeker.dto';

@Injectable()
export class SeekerService {
  //CreateSeekerDto: string;
  getScholarships() {
    return ['S1', 'S2', 'S2'];
  }
  searchScholarships(ScholarshipName: string) {
    return { messege: 'Search for Schoalrships', ScholarshipName };
  }
  createApplication(data: any) {
    return { messege: 'New application cretaed', data };
  }
  updateApplication(id: string, data: any) {
    return { message: 'Application with id ${id} updated', data };
  }
  filterScholarships(country: string, degree: string) {
    return {
      message: 'Filtered scholarships',
      filters: { country, degree },
    };
  }
  deleteApplication(id: string) {
    return { message: 'Deleted application', id };
  }

  createSeeker(CreateSeekerDto: createSeekerDto): string {
    const { name, email, password, phone } = CreateSeekerDto;
    return 
    'User created: ${name} (${email}) ${password} ${phone}';
  }
}
