import { IDeveloper } from "../../../developer/developer.model";
import { IUser } from "../../../user/user.model";
import { IGame } from "../../game.service";

export interface IReview {
    id: number;
    title: string;
    description: string;
    rating: number;
    datePlaced: Date;
    user: IUser;
    userId: number;
    reviewedGame?: IGame[];
    reviewedGameId?: number[];
    reviewedDeveloper?: IDeveloper[];
    reviewedDeveloperId?: number[];
}