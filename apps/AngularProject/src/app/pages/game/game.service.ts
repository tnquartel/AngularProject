import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGame } from './game.model';
import { DeveloperService } from '../developer/developer.service';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly games: IGame[] = [
  // constructor(private developerService: DeveloperService) {
      {
        id: 0,
        title: 'GTA V',
        summary:
        'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody — least of all each other.',
        genre: 'shooter',
        rating: 4.3,
        ageRating: '18+',
        price: 30,
        developers: [],
        developerIds: [],
        img: 'assets/images/gta.jpg',
        completed: true,
      },
      {
        id: 1,
        title: 'Pokemon Scarlet',
        summary:
        'Pokémon Scarlet and Pokémon Violet are the first open-world RPGs in the Pokémon series. As you enjoy the hallmarks of the series—meeting, teaming up with, battling, training, and trading Pokémon—you’ll be able to immerse yourself in a newly evolved adventure.',
        genre: 'rpg',
        rating: 2.3,
        ageRating: '6+',
        price: 60,
        developers: [],
        developerIds: [0, 1],
        img: 'assets/images/scarlet.jpg',
        completed: false,
      },
      {
        id: 2,
        title: 'Diep.io',
        summary:
        'From the creator of Agar.io, the newest online smash hit game comes to mobile! Upgrade your tank, shoot down other players and reach the top of the leaderboard!',
        genre: 'multiplayer',
        rating: 5,
        ageRating: '8+',
        price: 0,
        developers: [],
        developerIds: [],
        img: 'assets/images/diep.jpg',
        completed: false,
      },
      {
        id: 3,
        title: 'Pokemon Violet',
        summary:
        'Pokémon Scarlet and Pokémon Violet are the first open-world RPGs in the Pokémon series. As you enjoy the hallmarks of the series—meeting, teaming up with, battling, training, and trading Pokémon—you’ll be able to immerse yourself in a newly evolved adventure.',
        genre: 'rpg',
        rating: 2.3,
        ageRating: '6+',
        price: 60,
        developers: [],
        developerIds: [0, 1],
        img: 'assets/images/violet.jpg',
        completed: false,
      },
      {
        id: 4,
        title: 'Agar.io',
        summary:
        'Control your tiny cell and eat other players to grow larger! But watch out: players bigger than you will be trying to make you their lunch. Survive and eat long enough to become the biggest cell in the game!',
        genre: 'multiplayer',
        rating: 5,
        ageRating: '8+',
        price: 0,
        developers: [],
        developerIds: [],
        img: 'assets/images/agar.jpg',
        completed: false,
      },
    ];
  
    
    
    getGamesAsObservable(): Observable<IGame[]> {
      console.log('getGamesAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.games);
  }

  getGameById(id: number): IGame {
    return this.games.filter((c) => c.id == id)[0];
  }

  getGames(): IGame[] {
    return this.games;
  }
  addGame(game: IGame) {
    console.log(game);
    game.id = this.games.length;
    this.games.push(game);
  }
  updateGame(updatedGame: IGame) {
    console.log(updatedGame);

    let game = this.games.find((obj) => obj.id == updatedGame.id);
    let index = this.games.indexOf(game!);
    this.games[index] = updatedGame;
  }
  deleteGame(id: number) {
    let game = this.games.find((obj) => obj.id == id);
    let index = this.games.indexOf(game!);
    this.games.splice(index, 1);
  }
}
