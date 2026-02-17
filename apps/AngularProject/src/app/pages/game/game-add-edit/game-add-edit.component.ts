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
          id: this.staticGame.id,
          title: this.staticGame.title,
          summary: this.staticGame.summary,
          genre: this.staticGame.genre,
          rating: this.staticGame.rating,
          price: this.staticGame.price,
          developers: [],
          developerIds: this.staticGame.developers.map(g => g.id) ?? [],
          img: this.staticGame.img,
          ageRating: this.staticGame.ageRating,
          completed: this.staticGame.completed,
          releaseDate: this.staticGame.releaseDate,
          reviews: [],
          reviewIds: this.staticGame.developers.map(g => g.id) ?? [],
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
          developers: [],
          developerIds: [],
          img: '',
          completed: false,
          releaseDate: new Date (1500, 0, 0),
          reviews: [],
          reviewIds: [],
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
