import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface IFriend {
    id: string;
    name: string;
}

export interface IFriendSuggestion {
    id: string;
    name: string;
    mutualFriends: number;
}

export interface IGameRecommendation {
    id: string;
    title: string;
    genre: string;
    friendsPlayed: number;
    avgRating: number;
}

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private apiUrl = `${environment.apiUrl}/friends`;
    private recsApiUrl = `${environment.apiUrl}/recommendations`;

    constructor(private http: HttpClient) { }

    syncUser(userId: string, name: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/sync`, { userId, name }).pipe(
            map(response => response.results || response)
        );
    }

    getFriends(userId: string): Observable<IFriend[]> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
            map(response => response.results?.friends || response.friends || [])
        );
    }

    addFriend(userId: string, friendId: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${userId}/add/${friendId}`, {}).pipe(
            map(response => response.results || response)
        );
    }

    removeFriend(userId: string, friendId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${userId}/remove/${friendId}`).pipe(
            map(response => response.results || response)
        );
    }

    areFriends(userId: string, friendId: string): Observable<boolean> {
        return this.http.get<any>(`${this.apiUrl}/${userId}/check/${friendId}`).pipe(
            map(response => response.results?.areFriends || response.areFriends || false)
        );
    }

    getFriendSuggestions(userId: string): Observable<IFriendSuggestion[]> {
        return this.http.get<any>(`${this.apiUrl}/${userId}/suggestions`).pipe(
            map(response => response.results?.suggestions || response.suggestions || [])
        );
    }

    getGameRecommendations(userId: string): Observable<IGameRecommendation[]> {
        return this.http.get<any>(`${this.recsApiUrl}/friends/${userId}`).pipe(
            map(response => response.results?.recommendations || response.recommendations || [])
        );
    }

    recordGamePlayed(userId: string, gameId: string, rating?: number): Observable<any> {
        return this.http.post<any>(`${this.recsApiUrl}/played`, { userId, gameId, rating }).pipe(
            map(response => response.results || response)
        );
    }

    syncGame(gameId: string, title: string, genre: string): Observable<any> {
        return this.http.post<any>(`${this.recsApiUrl}/game/sync`, { gameId, title, genre }).pipe(
            map(response => response.results || response)
        );
    }
}