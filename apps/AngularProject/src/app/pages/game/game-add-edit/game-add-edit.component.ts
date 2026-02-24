import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IGame } from '../game.service';
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
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id');

      // Edit mode
      if (this.gameId) {
        this.gameExists = true;

        // Load game from API (async)
        this.gameService.getById(this.gameId).subscribe({
          next: (game) => {
            this.staticGame = game;
            this.game = {
              ...game,
              developers: [],
              reviews: []
            };
          },
          error: (err) => {
            console.error('Game not found', err);
            alert('Game not found');
            this.router.navigate(['game']);
          }
        });

      } else {
        // Create mode
        this.game = {
          title: '',
          summary: '',
          genre: '',
          rating: 0,
          ageRating: '',
          price: 0,
          developers: [],
          developerIds: [],
          imageUrl: '',
          img: '',
          completed: false,
          releaseDate: new Date(),
          reviews: [],
          reviewIds: [],
        };
      }
    });
  }

  onSubmit(): void {
    if (!this.game) {
      console.error('No game to submit');
      return;
    }

    console.log('Submit');
    if (this.gameExists && this.game._id) {
      console.log('Update game');
      this.gameService.update(this.game._id, this.game).subscribe({
        next: () => {
          console.log('Game updated successfully');
          this.router.navigate(['game']);
        },
        error: (err) => {
          console.error('Error updating game:', err);
        }
      });
    } else {
      console.log('Add game');
      const createGame = {
        title: this.game.title,
        summary: this.game.summary,
        genre: this.game.genre,
        releaseDate: this.game.releaseDate,
        price: this.game.price,
        ageRating: this.game.ageRating,
        imageUrl: this.game.imageUrl || this.game.img || ''
      };

      this.gameService.create(createGame).subscribe({
        next: () => {
          console.log('Game created successfully');
          this.router.navigate(['game']);
        },
        error: (err) => {
          console.error('Error creating game:', err);
        }
      });
    }
  }
}