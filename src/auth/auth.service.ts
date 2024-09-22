import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(userData) {
    const hash = await bcrypt.hash(userData.password, 10);
    return this.userService.createUser({ ...userData, password: hash });
  }

  async login(userData) {
    const user = await this.userService.findUser(userData.email);
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    return { message: 'Login successful', userId: user._id };
  }
}
