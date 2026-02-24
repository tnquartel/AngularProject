import { Id } from './id.type';

export enum ReviewType {
    GAME = 'game',
    DEVELOPER = 'developer'
}

export interface IReview {
    _id: Id;
    title: string;
    description: string;
    rating: number;
    datePlaced: Date;
    userId: Id;
    reviewType: ReviewType;
    reviewedEntityId: Id;
}

export interface IReviewInfo {
    _id: Id;
    title: string;
    rating: number;
    datePlaced: Date;
}

export type ICreateReview = Pick<IReview, 'title' | 'description' | 'rating' | 'userId' | 'reviewType' | 'reviewedEntityId'>;
export type IUpdateReview = Partial<Omit<IReview, '_id'>>;
export type IUpsertReview = IReview;