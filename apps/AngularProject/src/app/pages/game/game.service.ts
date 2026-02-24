import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface IGame {
    _id?: string;
    id?: number;
    title: string;
    summary: string;
    genre: string;
    releaseDate: Date;
    price: number;
    rating: number;
    ageRating: string;
    imageUrl?: string;
    img?: string;
    completed: boolean;
    reviewIds: string[];
    developerIds: (string | number)[];  // ← Fix: Explicitly typed array
    reviews?: any[];
    developers?: any[];
}

export interface ICreateGame {
    title: string;
    summary: string;
    genre: string;
    releaseDate: Date;
    price: number;
    ageRating: string;
    imageUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private apiUrl = `${environment.apiUrl}/game`;
    private gamesSubject = new BehaviorSubject<IGame[]>([]);

    constructor(private http: HttpClient) {
        // Load initial games
        this.loadGames();
    }

    private loadGames(): void {
        this.getAll().subscribe(games => {
            this.gamesSubject.next(games);
        });
    }

    // Nieuwe API methods
    getAll(): Observable<IGame[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => response.results || response),
            catchError(error => {
                console.error('Error fetching games:', error);
                return [];
            })
        );
    }

    getById(id: string): Observable<IGame> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(response => response.results || response)
        );
    }

    create(game: ICreateGame): Observable<IGame> {
        return this.http.post<any>(this.apiUrl, game).pipe(
            map(response => response.results || response),
            tap(() => this.loadGames())
        );
    }

    update(id: string, game: Partial<IGame>): Observable<IGame> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, game).pipe(
            map(response => response.results || response),
            tap(() => this.loadGames())
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.loadGames())
        );
    }

    // ===== OUDE METHODS VOOR BACKWARDS COMPATIBILITY =====
    
    getGames(): IGame[] {
        return this.gamesSubject.value;
    }

    getGamesAsObservable(): Observable<IGame[]> {
        return this.gamesSubject.asObservable();
    }

    getGameById(id: number): IGame | undefined {
        return this.gamesSubject.value.find(g => 
            g.id === id || g._id === id.toString()
        );
    }

    addGame(game: IGame): void {
        const createGame: ICreateGame = {
            title: game.title,
            summary: game.summary,
            genre: game.genre,
            releaseDate: game.releaseDate,
            price: game.price,
            ageRating: game.ageRating,
            imageUrl: game.imageUrl || game.img || ''
        };
        
        this.create(createGame).subscribe();
    }

    updateGame(game: IGame): void {
        if (game._id) {
            this.update(game._id, game).subscribe();
        }
    }

    deleteGame(id: number): void {
        const game = this.getGameById(id);
        if (game && game._id) {
            this.delete(game._id).subscribe();
        }
    }
}