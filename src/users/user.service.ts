import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData) {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async findUser(email: string) {
    return await this.userModel.findOne({ email });
  }
}
