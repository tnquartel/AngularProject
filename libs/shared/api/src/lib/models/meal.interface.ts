import { IEntity } from '@avans-nx-workshop/share-a-meal/entity';
import { IUserIdentity } from './user.interface';
import { IFoodItem } from './fooditem.interface';

export enum MealSort {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Other = 'Other'
}

export interface IMeal extends IEntity {
    title: string;
    description: string;
    mainImageUrl: string;
    isVega: boolean;
    dateServed: Date | string;
    sort: MealSort;
    cook: IUserIdentity;
    fooditems: [IFoodItem];
}

export type ICreateMeal = Pick<IMeal, 'title' | 'description' | 'sort'>;
export type IUpdateMeal = Partial<Omit<IMeal, '_id'>>;
export type IUpsertMeal = IMeal;
