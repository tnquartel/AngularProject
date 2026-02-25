import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

export interface IReview {
    _id?: string;
    id?: number;
    title: string;
    description: string;
    rating: number;
    datePlaced: Date;
    userId: string;
    reviewType: 'game' | 'developer';
    reviewedEntityId: string;
}

export interface ICreateReview {
    title: string;
    description: string;
    rating: number;
    userId: string;
    reviewType: 'game' | 'developer';
    reviewedEntityId: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = `${environment.apiUrl}/review`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<IReview[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => response.results || response)
        );
    }

    getByEntity(entityId: string): Observable<IReview[]> {
        return this.http.get<any>(`${this.apiUrl}?entityId=${entityId}`).pipe(
            map(response => response.results || response)
        );
    }

    getByUser(userId: string): Observable<IReview[]> {
        return this.http.get<any>(`${this.apiUrl}?userId=${userId}`).pipe(
            map(response => response.results || response)
        );
    }

    getById(id: string): Observable<IReview> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(response => response.results || response)
        );
    }

    create(review: ICreateReview): Observable<IReview> {
        return this.http.post<any>(this.apiUrl, review).pipe(
            map(response => response.results || response),
            tap(() => console.log('Review created'))
        );
    }

    update(id: string, review: Partial<IReview>): Observable<IReview> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, review).pipe(
            map(response => response.results || response),
            tap(() => console.log('Review updated'))
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => console.log('Review deleted'))
        );
    }
}