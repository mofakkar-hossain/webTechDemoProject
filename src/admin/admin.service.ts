import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
  getAllUsers(role?: string) {
    if (role) {
      return { message: `Filtered users by role: ${role}` };
    }
    return { message: 'All users fetched' };
  }

  getUserById(id: string) {
    return { id, name: 'Sample User', role: 'seeker' };
  }

  addUser(data: any) {
    return { message: 'User added', user: data };
  }

  updateUser(id: string, data: any) {
    return { message: `User ${id} updated`, data };
  }

  changeUserRole(id: string, role: string) {
    return { message: `User ${id} role changed to ${role}` };
  }

  removeUser(id: string) {
    return { message: `User ${id} removed` };
  }
}

