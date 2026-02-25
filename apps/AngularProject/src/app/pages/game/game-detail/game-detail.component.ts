import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService, IGame } from '../game.service';
import { AuthService } from '../../../services/auth.service';
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

    isCompletedByCurrentUser: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        const gameId = this.route.snapshot.paramMap.get('id');
        console.log('Loading game with ID:', gameId);

        if (gameId) {
            this.gameService.getById(gameId).subscribe({
                next: (game) => {
                    console.log('Game loaded from API:', game);
                    this.game = game;

                    const currentUser = this.authService.currentUserValue;
                    if (currentUser) {
                        this.isCompletedByCurrentUser = currentUser.completedGameIds?.includes(gameId) || false;
                    }
                },
                error: (err) => {
                    console.error('Error loading from API:', err);
                    this.game = this.gameService.getGameById(Number(gameId));
                    console.log('Game from old method:', this.game);
                }
            });
        } else {
            console.error('No game ID found in route');
        }
    }
}