import { IGame } from "../game/game.service"
import { IReview } from "../game/game-detail/review/review.model"
export interface IDeveloper {
    id: number;
    name: string;
    dateFounded: Date;
    summary: string;
    games: IGame[];
    gameIds: number[];
    reviews: IReview[];
    reviewIds: number[];
  }