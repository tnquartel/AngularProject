export interface IGame {
  id: number;
  title: string;
  summary: string;
  genre: string;
  // developers: Developer[]
  rating: number;
  ageRating: string;
  price: number;
  img: string;
  completed: boolean;
}
