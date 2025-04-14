import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IGame } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-add-edit',
  templateUrl: './game-add-edit.component.html',
  styleUrls: ['./game-add-edit.component.scss'],
})
export class GameAddEditComponent implements OnInit {
  game: IGame | undefined;
  staticGame: IGame | undefined;
  gameId: string | null = null;
  gameExists: boolean = false;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
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
          genre: '',
          rating: 0,
          ageRating: '',
          price: 0,
          img: '',
          completed: false,
        };
      }
    });
  }
  onSubmit(): void {
    console.log('Submit');
    if (this.gameExists) {
      console.log('Update game');
      this.gameService.updateGame(this.game!);
      this.router.navigate(['game']);
    } else {
      console.log('Add game');
      this.gameService.addGame(this.game!);
      this.router.navigate(['game']);
    }
  }
}
