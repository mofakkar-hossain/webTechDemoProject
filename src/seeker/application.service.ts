import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entity/application.entity';
import { SeekerEntity } from 'src/seeker/entity/seeker.entity';
import { CreateApplicationDto } from './dto/CreateApplication.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private appRepo: Repository<ApplicationEntity>,
    @InjectRepository(SeekerEntity)
    private seekerRepo: Repository<SeekerEntity>,
  ) {}

  async createApplication(seekerId: number, dto: CreateApplicationDto) {
    const seeker = await this.seekerRepo.findOne({ where: { id: seekerId } });

    if (!seeker) throw new NotFoundException('Seeker not found');

    const application = this.appRepo.create({
      ...dto,
      appliedAt: new Date(),
      seeker: seeker,
    });

    return this.appRepo.save(application);
  }

  async getApplicationsBySeeker(seekerId: number) {
    const applications = await this.appRepo.find({
      where: { seeker: { id: seekerId } },
      relations: ['seeker'],
    });

    if (!applications || applications.length === 0) {
      throw new NotFoundException(
        `No applications found for seeker ID ${seekerId}`,
      );
    } else {
    }
    return applications;
  }

  async deleteApplication(id: number) {
    const result = await this.appRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Application not found');
    }
    return { message: 'Application deleted successfully' };
  }

  async getOneForSeeker(appId: number, seekerId: number) {
    const app = await this.appRepo.findOne({
      where: { applicationId: appId },
      relations: ['seeker'],
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.seeker?.id !== seekerId)
      throw new ForbiddenException('You cannot access this application');

    return app;
  }

  async withdraw(appId: number, seekerId: number) {
    const app = await this.appRepo.findOne({
      where: { applicationId: appId },
      relations: ['seeker'],
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.seeker?.id !== seekerId)
      throw new ForbiddenException('You cannot withdraw this application');

    app.status = 'withdrawn';
    await this.appRepo.save(app);
    return {
      message: 'Application withdrawn',
      applicationId: app.applicationId,
      status: app.status,
    };
  }
}
