import { Component, Input, OnInit } from '@angular/core';
import { IGame } from '../../game.model';
import { GameService } from '../../game.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game: IGame | undefined;
  faCheck = faCheck;
  faX = faTimes;
  faStar = faStar;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
  deleteGame() {
    console.log('delete');
    this.gameService.deleteGame(this.game!.id);
  }
}
