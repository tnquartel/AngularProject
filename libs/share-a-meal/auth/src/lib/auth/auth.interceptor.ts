import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('AuthInterceptor');
        const storedUser = localStorage.getItem(this.auth.CURRENT_USER);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${user.token}` }
            });
            return next.handle(authReq);
        } else return next.handle(req);
    }
}

/**
 * Http interceptor providers in outside-in order
 * https://angular.io/guide/http#interceptor-order
 */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
