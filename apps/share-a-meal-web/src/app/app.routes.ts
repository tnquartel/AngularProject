import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import {
    LoginFormComponent,
    RegisterFormComponent
} from '@avans-nx-workshop/share-a-meal/auth';
import { LoggedInAuthGuard } from '@avans-nx-workshop/share-a-meal/auth';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'about',
        pathMatch: 'full',
        component: AboutComponent
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginFormComponent
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterFormComponent
    },
    {
        path: 'user',
        loadChildren: () =>
            import(
                /* webpackChunkName: "user.module" */ '@avans-nx-workshop/share-a-meal/user'
            ).then((esModule) => esModule.UserModule),
        canActivate: [LoggedInAuthGuard]
    },
    {
        path: 'features',
        loadChildren: () =>
            import(
                /* webpackChunkName: "meal.module" */ '@avans-nx-workshop/share-a-meal/features'
            ).then((esModule) => esModule.FeaturesModule)
    }
];
