import { IDeveloper } from "../developer/developer.model"
import { IReview } from "./game-detail/review/review.model";
export interface IGame {
  id: number;
  title: string;
  summary: string;
  genre: string;
  releaseDate: Date;
  price: number;
  rating: number;
  ageRating: string;
  img: string;
  completed: boolean;
  reviews: IReview[];
  reviewIds: number[];
  developerIds: number[];
  developers: IDeveloper[];
}
