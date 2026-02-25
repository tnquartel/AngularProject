import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface IDeveloper {
    _id?: string;
    id?: number;
    name: string;
    dateFounded: Date;
    summary: string;
    gameIds: string[] | number[];
    reviewIds: string[];
    games?: any[];
}

export interface ICreateDeveloper {
    name: string;
    dateFounded: Date;
    summary: string;
}

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {
    private apiUrl = `${environment.apiUrl}/developer`;
    private developersSubject = new BehaviorSubject<IDeveloper[]>([]);

    constructor(private http: HttpClient) {
        this.loadDevelopers();
    }

    private loadDevelopers(): void {
        this.getAll().subscribe(developers => {
            this.developersSubject.next(developers);
        });
    }

    getAll(): Observable<IDeveloper[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => response.results || response),
            catchError(error => {
                console.error('Error fetching developers:', error);
                return [];
            })
        );
    }

    getById(id: string): Observable<IDeveloper> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(response => response.results || response)
        );
    }

    create(developer: ICreateDeveloper): Observable<IDeveloper> {
        return this.http.post<any>(this.apiUrl, developer).pipe(
            map(response => response.results || response),
            tap(() => this.loadDevelopers())
        );
    }

    update(id: string, developer: Partial<IDeveloper>): Observable<IDeveloper> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, developer).pipe(
            map(response => response.results || response),
            tap(() => this.loadDevelopers())
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.loadDevelopers())
        );
    }
    
    getDevelopers(): IDeveloper[] {
        return this.developersSubject.value;
    }

    getDevelopersAsObservable(): Observable<IDeveloper[]> {
        return this.developersSubject.asObservable();
    }

    getDeveloperById(id: number): IDeveloper | undefined {
        return this.developersSubject.value.find(d => 
            d.id === id || d._id === id.toString()
        );
    }

    addDeveloper(developer: IDeveloper): void {
        const createDeveloper: ICreateDeveloper = {
            name: developer.name,
            dateFounded: developer.dateFounded,
            summary: developer.summary
        };
        this.create(createDeveloper).subscribe();
    }

    updateDeveloper(developer: IDeveloper): void {
        if (developer._id) {
            this.update(developer._id, developer).subscribe();
        }
    }

    deleteDeveloper(id: number): void {
        const developer = this.getDeveloperById(id);
        if (developer && developer._id) {
            this.delete(developer._id).subscribe();
        }
    }
}