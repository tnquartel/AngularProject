import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<UserModel[]> {
    return this.userModel
      .find(
        {},
        {
          // id: 1,
          // firstName: 1,
          // lastName: 1,
          // emailAdress: 1,
          // phoneNumber: 1,
          // isStudent: 1,
        }
      )
      .exec();
  }

}