import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userSerivice: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.userSerivice.findOne(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }
}
