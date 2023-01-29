import { IUser } from "../../../user/user.model";

export interface IReview {
    id: number;
    title: string;
    description: string;
    rating: number;
    user: IUser;
}