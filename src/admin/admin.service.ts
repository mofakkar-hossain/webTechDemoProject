import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
  getAdmins() {
    return ['Admin1', 'Admin2', 'Admin3'];
  }

  getAdminById(id: string) {
    return { message: 'Get admin by id', id };
  }

  createAdmin(data: any) {
    return { message: 'Admin created', data };
  }

  updateAdmin(id: string, data: any) {
    return { message: `Admin with id ${id} updated`, data };
  }

  deleteAdmin(id: string) {
    return { message: 'Deleted admin', id };
  }

  searchAdmin(name: string) {
    return { message: 'Searched for admin', name };
  }
}
