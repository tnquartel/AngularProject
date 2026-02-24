import { Id } from './id.type';

export interface IGame {
    _id: Id;
    title: string;
    summary: string;
    genre: string;
    releaseDate: Date;
    price: number;
    rating: number;
    ageRating: string;
    imageUrl: string;
    completed: boolean;
    reviewIds: Id[];
    developerIds: Id[];
}

export interface IGameInfo {
    _id: Id;
    title: string;
    genre: string;
    rating: number;
    price: number;
    imageUrl: string;
}

export type ICreateGame = Pick<IGame, 'title' | 'summary' | 'genre' | 'releaseDate' | 'price' | 'ageRating' | 'imageUrl'>;
export type IUpdateGame = Partial<Omit<IGame, '_id'>>;
export type IUpsertGame = IGame;