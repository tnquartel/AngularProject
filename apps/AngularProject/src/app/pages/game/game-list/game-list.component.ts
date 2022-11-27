import { Component, OnInit } from '@angular/core';
import { IGame } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: IGame[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games = this.gameService.getGames();
  }
}
