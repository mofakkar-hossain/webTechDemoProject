import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { NoticeEntity } from './entities/notice.entity';
import { CreateAdminDto } from './dtos/createAdmin.dto';
import { CreateNoticeDto } from './dtos/createNotice.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: Repository<AdminEntity>,
    @InjectRepository(NoticeEntity) private readonly noticeRepo: Repository<NoticeEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async createAdmin(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({ where: { userName: dto.userName } });
    if (exists) throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);

    const admin = this.adminRepo.create(dto);
    await this.adminRepo.save(admin);

    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Welcome Admin',
      text: `Hello ${dto.userName}, your admin account has been created.`,
    });

    return 'Admin created successfully';
  }

  async getAllAdmins() {
    return this.adminRepo.find({ select: ['id', 'userName'] });
  }

  async createNotice(adminId: number, dto: CreateNoticeDto) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

    const notice = this.noticeRepo.create({ ...dto, admin });
    const savedNotice = await this.noticeRepo.save(notice);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'New Notice Created',
      text: `Notice "${dto.title}" has been posted by ${admin.userName}.`,
    });

    return {...savedNotice, admin: {id: admin.id, Username: admin.userName,}};
  }

  async getNotices(adminId: number) {
    return this.noticeRepo.find({ where: { admin: { id: adminId } } });
  }

  async updateNotice(noticeId: number, dto: CreateNoticeDto) {
    await this.noticeRepo.update(noticeId, dto);
    return this.noticeRepo.findOne({ where: { id: noticeId } });
  }

  async toggleNoticePublish(noticeId: number) {
    const notice = await this.noticeRepo.findOne({ where: { id: noticeId } });
    if (!notice) throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);

    notice.published = !notice.published;
    await this.noticeRepo.save(notice);

    return { message: `Notice ${notice.published ? 'published' : 'unpublished'}`, notice };
  }

  async deleteNotice(noticeId: number) {
    const notice = await this.noticeRepo.findOne({ where: { id: noticeId } });
    if (!notice) throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);

    await this.noticeRepo.delete(noticeId);
    return 'Notice deleted';
  }
}