import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import {
    IUpdateUser,
    IUpsertUser,
    IUserRegistration,
    Id,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;
}

export class UpsertUserDto implements IUpsertUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    age!: number;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsOptional()
    profileImgUrl?: string;

    @IsString()
    role!: UserRole;

    @IsString()
    gender!: UserGender;

    @IsBoolean()
    isActive!: boolean;

    placedReviewIds: Id[] = [];
    friendIds: Id[] = [];
    completedGameIds: Id[] = [];
}

export class UpdateUserDto implements IUpdateUser {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}
