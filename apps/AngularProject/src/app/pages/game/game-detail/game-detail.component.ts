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
      this.gameId = params.get('id');
      //Edit
      if (this.gameId) {
        this.gameExists = true;
        this.staticGame = this.gameService.getGameById(Number(this.gameId));
        this.game = {
          ...JSON.parse(
            JSON.stringify(this.gameService.getGameById(Number(this.gameId)))
          ),
        };
        //Create
      } else {
        this.game = {
          id: 0,
          title: '',
          summary: '',
          rating: 0,
          price: 0,
          img: '',
          ageRating: '',
          completed: false,
        };
      }
    });
  }
}
