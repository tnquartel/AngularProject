import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface IUser {
    _id?: string;
    id?: number;
    name: string;
    age: number;
    emailAddress: string;
    phoneNumber: string;
    profileImgUrl?: string;
    role: string;
    gender: string;
    isActive: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/user`;
    private usersSubject = new BehaviorSubject<IUser[]>([]);

    constructor(private http: HttpClient) {
        this.loadUsers();
    }

    private loadUsers(): void {
        this.getAll().subscribe(users => {
            this.usersSubject.next(users);
        });
    }

    getAll(): Observable<IUser[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => response.results || response)
        );
    }

    getById(id: string): Observable<IUser> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(response => response.results || response)
        );
    }

    create(user: Partial<IUser>): Observable<IUser> {
        return this.http.post<any>(this.apiUrl, user).pipe(
            map(response => response.results || response),
            tap(() => this.loadUsers())
        );
    }

    update(id: string, user: Partial<IUser>): Observable<IUser> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, user).pipe(
            map(response => response.results || response),
            tap(() => this.loadUsers())
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.loadUsers())
        );
    }

    getUsersAsObservable(): Observable<IUser[]> {
        return this.usersSubject.asObservable();
    }

    getUsers(): IUser[] {
        return this.usersSubject.value;
    }

    getUserById(id: number): IUser | undefined {
        return this.usersSubject.value.find(u => 
            u.id === id || u._id === id.toString()
        );
    }
}