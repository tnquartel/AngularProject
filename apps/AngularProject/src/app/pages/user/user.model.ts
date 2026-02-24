import { IReview } from "../game/game-detail/review/review.model";
import { IGame } from "../game/game.service";

export interface IUser {
  id: number;
  name: string;
  age: number;
  emailAdress: string;
  phoneNumber: string;
  password: string;
  placedReviews: IReview[];
  placedReviewIds: number[];
  friends: IUser[];
  friendIds: number[];
  completedGames: IGame[];
  completedGameIds: number[];
}
