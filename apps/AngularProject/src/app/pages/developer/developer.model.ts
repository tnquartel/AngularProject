import { IGame } from "../game/game.model"
export interface IDeveloper {
    id: number;
    name: string;
    dateFounded: Date;
    summary: string;
    games: IGame[];
    gameIds: number[];
  }