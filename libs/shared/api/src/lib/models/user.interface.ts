import { IEntity } from '@avans-nx-workshop/share-a-meal/entity';
import { IMeal } from './meal.interface';
import { IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    None = 'None',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity extends IEntity {
    name: string;
    emailAddress: string;
    profileImgUrl: string;
    role: UserRole;
    token?: string;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
}

/**
 * All user information, incl. domain entities
 */
export interface IUser extends IUserInfo {
    meals: IMeal[];
}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>>;
export type IUpsertUser = IUser;
