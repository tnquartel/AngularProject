import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
    ApiResponse,
    IUserCredentials,
    IUserIdentity,
    IUserInfo,
    IUserRegistration
} from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { AlertService, AlertType } from '@avans-nx-workshop/share-a-meal/ui';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // This observable returns the user's token if logged in
    public currentUserIsLoggedIn$ = new BehaviorSubject<string | undefined>(
        undefined
    );
    public currentUserInfo$ = new BehaviorSubject<IUserIdentity | undefined>(
        undefined
    );
    public readonly USER_TOKEN = 'token';
    public readonly CURRENT_USER = 'currentuser';
    private readonly AUTH_URL: string | undefined;
    // private readonly DATA_URL: string | undefined;
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router
    ) {
        // Bewaar de Base Url
        this.AUTH_URL = `${environment.dataApiUrl}/auth`;
        // this.DATA_URL = environment.dataApiUrl;

        console.log('AuthService constructor', this.AUTH_URL);

        // Check of we al een ingelogde user hebben
        this.getFromLocalStorage(this.CURRENT_USER).subscribe((userInfo) => {
            if (userInfo) {
                console.log('User found in local storage');
                this.currentUserInfo$.next(userInfo as IUserInfo);
            } else {
                console.log('No stored userinfo found');
            }
        });
    }

    /**
     *
     * @param formData
     * @returns
     */
    login(
        credentials: IUserCredentials
    ): Observable<IUserIdentity | undefined> {
        console.log(`login at ${this.AUTH_URL}/login`);

        return this.http
            .post<ApiResponse<IUserIdentity>>(
                `${this.AUTH_URL}/login`,
                credentials,
                {
                    headers: this.headers
                }
            )
            .pipe(
                map((response: any) => response.results),
                map((user: IUserIdentity) => {
                    this.saveToLocalStorage(this.CURRENT_USER, user);
                    this.currentUserInfo$.next(user);
                    this.alertService.success('You have been logged in');
                    return user;
                }),
                catchError((error) => {
                    console.log('error:', error);
                    this.alertService.error(
                        error.error.message || error.message
                    );
                    return of(undefined);
                })
            );
    }

    register(
        userData: IUserRegistration
    ): Observable<IUserRegistration | undefined> {
        console.log(`register at ${this.AUTH_URL}/user`);
        console.log(userData);
        return this.http
            .post<IUserRegistration>(`${this.AUTH_URL}/register`, userData, {
                headers: this.headers
            })
            .pipe(
                map((user) => {
                    this.alertService.showAlert({
                        type: AlertType.Success,
                        message: 'You have been registered',
                        visible: true
                    });
                    return user;
                }),
                catchError((error) => {
                    console.log('error:', error);
                    this.alertService.showAlert({
                        type: AlertType.Error,
                        message: error.error.message || error.message,
                        visible: true
                    });
                    return of(undefined);
                })
            );
    }

    logout(): void {
        this.router
            .navigate(['/'])
            .then((success) => {
                // true when canDeactivate allows us to leave the page.
                if (success) {
                    console.log('logout - removing local user info');
                    localStorage.removeItem(this.CURRENT_USER);
                    localStorage.removeItem(this.USER_TOKEN);
                    this.currentUserIsLoggedIn$.next(undefined);
                    this.currentUserInfo$.next(undefined);
                    this.alertService.showAlert({
                        type: AlertType.Success,
                        message: 'You have been logged out',
                        visible: true
                    });
                } else {
                    console.log('navigate result:', success);
                }
            })
            .catch(() => console.log('not logged out!'));
    }

    public getFromLocalStorage(
        key: string
    ): Observable<string | IUserInfo | undefined> {
        console.log('getFromLocalStorage', key);
        const data = localStorage.getItem(key);
        if (data && !!data) {
            const parsedData = JSON.parse(data);
            return of(parsedData);
        }
        return of(undefined);
    }

    private saveToLocalStorage(
        key: string,
        value: string | IUserIdentity
    ): void {
        console.log('saveToLocalStorage', key);
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Check of de current user editrechten heeft op een View item.
     *
     * @param itemUserId
     * @returns
     */
    userMayEdit(itemUserId: string): Observable<boolean> {
        console.log('userMayEdit?');
        // return this.currentUserIsLoggedIn$.pipe(
        const user$ = this.getFromLocalStorage(
            this.CURRENT_USER
        ) as Observable<IUserInfo>;
        return user$.pipe(
            map((user: IUserInfo | undefined) =>
                user ? user._id === itemUserId : false
            )
        );
    }
}
