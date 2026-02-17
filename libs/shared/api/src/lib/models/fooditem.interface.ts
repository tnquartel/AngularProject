import { IEntity } from '@avans-nx-workshop/share-a-meal/entity';
import { IUserIdentity } from './user.interface';

export interface IFoodItem extends IEntity {
    name: string;
    description: string;
    isVega: boolean;
    userOwner: IUserIdentity;
}

export type ICreateFoodItem = Pick<IFoodItem, 'name' | 'description'>;
export type IUpdateFoodItem = Partial<Omit<IFoodItem, '_id | userOwner'>>;
export type IUpsertFoodItem = Partial<Omit<IFoodItem, '_id | userOwner'>>;
