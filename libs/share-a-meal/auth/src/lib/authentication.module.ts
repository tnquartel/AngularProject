import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { LoggedInAuthGuard } from './auth/auth.guards';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { httpInterceptorProviders } from './auth/auth.interceptor';
import { LoginFormComponent } from './auth/login/login-form.component';
import { RegisterFormComponent } from './auth/register/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@NgModule({
    declarations: [LoginFormComponent, RegisterFormComponent],
    imports: [
        AngularCommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
    providers: [
        LoggedInAuthGuard,
        // SaveEditedWorkGuard,
        AuthService,
        httpInterceptorProviders
    ],
    exports: [LoginFormComponent, RegisterFormComponent]
})
export class AuthenticationModule {}
