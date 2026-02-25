import { Component, Input, OnInit } from '@angular/core';
import { IGame } from '../../game.service';
import { GameService } from '../../game.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';
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

  constructor(
    private gameService: GameService,
    public authService: AuthService
  ) { }

  ngOnInit(): void { }

  deleteGame(): void {
    if (!this.game) return;

    if (confirm('Are you sure you want to delete this game?')) {
      console.log('Deleting game...');

      const id = this.game._id?.toString() || this.game.id?.toString();

      if (id) {
        this.gameService.delete(id).subscribe({
          next: () => {
            console.log('Game deleted successfully');
            window.location.reload();
          },
          error: (err) => {
            console.error('Error deleting game:', err);
            alert('Failed to delete game');
          }
        });
      } else {
        console.error('No valid ID found for game');
      }
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}