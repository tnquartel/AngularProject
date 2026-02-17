import { ApplicationConfig } from '@angular/core';
import {
    provideRouter,
    withEnabledBlockingInitialNavigation
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { httpInterceptorProviders } from '@avans-nx-workshop/share-a-meal/auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(),
        httpInterceptorProviders
    ]
};
