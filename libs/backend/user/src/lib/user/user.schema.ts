import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import {
    IUser,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    name!: string;

    @Prop({
        required: true,
        type: Number
    })
    age!: number;

    @Prop({
        required: true,
        type: String
    })
    phoneNumber!: string;

    @Prop({
        required: true,
        select: false,
        type: String
    })
    password = '';

    @Prop({
        required: true,
        type: String,
        select: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                return isEmail(v);
            },
            message: 'should be a valid email address'
        }
    })
    emailAddress = '';

    @Prop({
        required: false,
        select: true,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png'
    })
    profileImgUrl!: string;

    @Prop({
        required: false,
        type: String,
        default: UserRole.Guest
    })
    role: UserRole = UserRole.Guest;

    @Prop({
        required: false,
        type: String,
        default: UserGender.Unknown
    })
    gender: UserGender = UserGender.Unknown;

    @Prop({
        required: false,
        type: Boolean,
        default: true
    })
    isActive = true;

    @Prop({
        default: [],
        type: [MongooseSchema.Types.ObjectId],
        ref: 'Review'
    })
    placedReviewIds: string[] = [];

    @Prop({
        default: [],
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User'
    })
    friendIds: string[] = [];

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Game', default: [] })
    completedGameIds?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);