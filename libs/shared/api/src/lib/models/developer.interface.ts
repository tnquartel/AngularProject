import { Id } from './id.type';

export interface IDeveloper {
    _id: Id;
    name: string;
    dateFounded: Date;
    summary: string;
    gameIds: Id[];
    reviewIds: Id[];
}

export interface IDeveloperInfo {
    _id: Id;
    name: string;
    dateFounded: Date;
}

export type ICreateDeveloper = Pick<IDeveloper, 'name' | 'dateFounded' | 'summary'>;
export type IUpdateDeveloper = Partial<Omit<IDeveloper, '_id'>>;
export type IUpsertDeveloper = IDeveloper;