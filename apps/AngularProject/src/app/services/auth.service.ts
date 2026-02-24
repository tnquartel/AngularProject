import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface IUserIdentity {
    _id: string;
    name: string;
    emailAddress: string;
    profileImgUrl?: string;
    role: string;
    token: string;
}

export interface ILoginCredentials {
    emailAddress: string;
    password: string;
}

export interface IRegisterData {
    name: string;
    emailAddress: string;
    password: string;
    age: number;
    phoneNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<IUserIdentity | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        // Check if user is already logged in (token in localStorage)
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    get currentUserValue(): IUserIdentity | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    login(credentials: ILoginCredentials): Observable<IUserIdentity> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            map(response => response.results || response),
            tap(user => {
                // Store user & token in localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                this.currentUserSubject.next(user);
                console.log('User logged in:', user);
            })
        );
    }

    register(userData: IRegisterData): Observable<IUserIdentity> {
        return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
            map(response => response.results || response),
            tap(user => {
                // Auto-login after register
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                this.currentUserSubject.next(user);
                console.log('User registered:', user);
            })
        );
    }

    logout(): void {
        // Remove user from localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
        console.log('User logged out');
    }
}