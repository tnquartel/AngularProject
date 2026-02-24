import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService, IGame } from '../game.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-game-detail',
    templateUrl: './game-detail.component.html',
    styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
    game: IGame | undefined;
    faStar = faStar;
    faCheck = faCheck;
    faX = faTimes;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService
    ) {}

    ngOnInit(): void {
        const gameId = this.route.snapshot.paramMap.get('id');
        console.log('Loading game with ID:', gameId);
        
        if (gameId) {
            // Probeer eerst via API
            this.gameService.getById(gameId).subscribe({
                next: (game) => {
                    console.log('Game loaded from API:', game);
                    this.game = game;
                },
                error: (err) => {
                    console.error('Error loading from API:', err);
                    // Fallback: probeer via oude method
                    this.game = this.gameService.getGameById(Number(gameId));
                    console.log('Game from old method:', this.game);
                }
            });
        } else {
            console.error('No game ID found in route');
        }
    }
}