import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService, IGame } from '../game.service';
import { RecommendationsService } from '../../../services/recommendations.service';
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
        private recommendationsService: RecommendationsService,
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
                    
                    this.checkCompletedFromNeo4j(gameId);
                },
                error: (err) => {
                    console.error('Error loading from API:', err);
                }
            });
        } else {
            console.error('No game ID found in route');
        }
    }

    checkCompletedFromNeo4j(gameId: string): void {
        const currentUser = this.authService.currentUserValue;
        if (!currentUser) {
            this.isCompletedByCurrentUser = false;
            return;
        }

        console.log('Checking Neo4j for completed games...');

        this.recommendationsService.getUserCompletedGames(currentUser._id).subscribe({
            next: (completedGameIds) => {
                console.log('Completed games from Neo4j:', completedGameIds);
                this.isCompletedByCurrentUser = completedGameIds.includes(gameId);
                console.log('Is this game completed?', this.isCompletedByCurrentUser);
            },
            error: (err) => {
                console.error('Error fetching completed games:', err);
                this.isCompletedByCurrentUser = false;
            }
        });
    }
}