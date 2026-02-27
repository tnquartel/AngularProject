import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private apiUrl = `${environment.apiUrl}/recommendations`;

  constructor(private http: HttpClient) {}

  getUserCompletedGames(userId: string): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/completed-games`).pipe(
      map(response => response.results || response)
    );
  }

  syncGame(gameId: string, title: string, genre: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/game/sync`, { gameId, title, genre });
  }

  recordGamePlayed(userId: string, gameId: string, rating: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/played`, { userId, gameId, rating });
  }

  removeGamePlayed(userId: string, gameId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/played`, {
      body: { userId, gameId }
    });
  }

  getRecommendationsByFriends(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/friends/${userId}`).pipe(
      map(response => response.results || response)
    );
  }

  getPopularInNetwork(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/popular/${userId}`).pipe(
      map(response => response.results || response)
    );
  }

  getRecommendationsByGenre(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/genre/${userId}`).pipe(
      map(response => response.results || response)
    );
  }
}