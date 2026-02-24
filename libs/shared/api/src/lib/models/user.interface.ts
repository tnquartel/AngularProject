import { Id } from './id.type';

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
    Unknown = 'Unknown'
}

export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
}

export interface IUser {
    _id: Id;
    name: string;
    age: number;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    profileImgUrl?: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
    placedReviewIds: Id[];
    friendIds: Id[];
    completedGameIds: Id[];
}

export interface IUserIdentity {
    _id: Id;
    name: string;
    emailAddress: string;
    profileImgUrl?: string;
    role: UserRole;
    token: string;
}

export type IUserInfo = Pick<IUser, '_id' | 'name' | 'emailAddress' | 'profileImgUrl' | 'role' | 'gender' | 'isActive' | 'age'>;

export type ICreateUser = Pick<IUser, 'name' | 'age' | 'emailAddress' | 'phoneNumber' | 'password' | 'role' | 'gender'>;
export type IUpdateUser = Partial<Omit<IUser, '_id' | 'password'>>;
export type IUpsertUser = IUser;