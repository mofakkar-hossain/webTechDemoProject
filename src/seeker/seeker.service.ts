import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createSeekerDto } from './dto/CreateSeeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeekerEntity } from './entity/seeker.entity';
import { Any, Repository } from 'typeorm';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class SeekerService {
  applicationRepository: any;

  constructor(
    @InjectRepository(SeekerEntity)
    private seekerRepo: Repository<SeekerEntity>,
    private readonly mailerService: MailerService,
  ) {}

  filterScholarships(country: string, degree: string) {
    return {
      message: 'Filtered scholarships',
      filters: { country, degree },
    };
  }

  async createSeeker(dto: createSeekerDto): Promise<string> {
    const { fullName, email, password, age } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const seeker = this.seekerRepo.create({
      fullName: fullName,
      email,
      password: hashedPassword,
      age,
      status: 'active',
    });

    await this.seekerRepo.save(seeker);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Registration Successful - Scholarship Platform',
      text: `Hello ${fullName}},\n\nYour registration is successful! You can now explore scholarships and apply with your profile.`,
      html: `<p>Hello <strong>${fullName}</strong>,</p>
           <p>Your registration was successful </p>
           <p>You can now explore scholarships and start applying.</p>
           <br>
           <p>Regards,<br>Scholarship Team</p>`,
    });

    return `User created: ${fullName} (${email}) ${age}`;
  }

  async updateStatus(id: number, dto: UpdateStatusDto): Promise<SeekerEntity> {
    await this.seekerRepo.update(id, { status: dto.status });
    const updated = await this.seekerRepo.findOneBy({ id });

    if (!updated) {
      throw new NotFoundException(`Seeker with ID ${id} not found`);
    }
    return updated;
  }

  getInactive() {
    return this.seekerRepo.find({ where: { status: 'inactive' } });
  }

  async getMe(id: number) {
    const s = await this.seekerRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Seeker not found');
    const { password, ...safe } = s;
    return safe;
  } 

  async updateMe(id: number, dto: UpdateProfileDto) {
    await this.seekerRepo.update({ id }, dto); 
    return this.getMe(id);
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const s = await this.seekerRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Seeker not found');
    const ok = await bcrypt.compare(dto.currentPassword, s.password);
    if (!ok) throw new UnauthorizedException('Current password incorrect'); 
    s.password = await bcrypt.hash(dto.newPassword, await bcrypt.genSalt());
    await this.seekerRepo.save(s); 
    return { message: 'Password updated' };
  }
}
