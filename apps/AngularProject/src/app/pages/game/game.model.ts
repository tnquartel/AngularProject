import { IDeveloper } from "../developer/developer.model"
export interface IGame {
  id: number;
  title: string;
  summary: string;
  genre: string;
  developerIds: number[];
  developers: IDeveloper[];
  rating: number;
  ageRating: string;
  price: number;
  img: string;
  completed: boolean;
}
