import { Component, OnInit } from '@angular/core';
import { GameService, IGame } from '../game.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
    games: IGame[] = [];
    loading = true;
    error: string | null = null;

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        this.loadGames();
    }

    loadGames(): void {
        this.loading = true;
        this.gameService.getAll().subscribe({
            next: (games) => {
                this.games = games;
                this.loading = false;
                console.log('Games loaded:', games);
            },
            error: (error) => {
                this.error = 'Failed to load games';
                this.loading = false;
                console.error('Error loading games:', error);
            }
        });
    }

    deleteGame(id: string): void {
        if (confirm('Are you sure you want to delete this game?')) {
            this.gameService.delete(id).subscribe({
                next: () => {
                    this.loadGames();
                },
                error: (error) => {
                    console.error('Error deleting game:', error);
                    alert('Failed to delete game');
                }
            });
        }
    }
}