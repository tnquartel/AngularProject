import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
    ) { }

    async findAll(): Promise<IUserInfo[]> {
        this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IUser | null> {
        this.logger.log(`finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async findOneByEmail(email: string): Promise<IUserInfo | null> {
        this.logger.log(`Finding user by email ${email}`);
        const item = this.userModel
            .findOne({ emailAddress: email })
            .select('-password')
            .exec();
        return item;
    }

    async create(user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log(`Create user ${user.name}`);
        const createdItem = this.userModel.create(user);
        return createdItem;
    }

    async update(id: string, updateUserDto: Partial<IUser>): Promise<IUser> {
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userObject: any = user.toObject();
        delete userObject.password;

        return userObject;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async delete(_id: string): Promise<any> {
        this.logger.log(`Delete ${_id}`);
        return this.userModel.deleteOne({ _id });
    }
}
