import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
} from '@angular/router';
import { IGame } from '../game.model';
import { GameService } from '../game.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: IGame | undefined;
  staticGame: IGame | undefined;
  gameId: string | null = null;
  gameExists: boolean = false;
  faCheck = faCheck;
  faX = faTimes;
  faStar = faStar;
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const allGames = this.gameService.getGames(); // of uit AppComponent
      this.game = allGames.find(dev => dev.id === id);
    });
  }
}
