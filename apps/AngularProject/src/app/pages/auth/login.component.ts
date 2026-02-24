import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ILoginCredentials } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    template: `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3>Login</h3>
                        </div>
                        <div class="card-body">
                            <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
                                <div class="mb-3">
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        [(ngModel)]="credentials.emailAddress" 
                                        name="email" 
                                        required
                                        placeholder="john@example.com">
                                </div>

                                <div class="mb-3">
                                    <label for="password">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        [(ngModel)]="credentials.password" 
                                        name="password" 
                                        required
                                        placeholder="Password">
                                </div>

                                <div class="alert alert-danger" *ngIf="error">
                                    {{ error }}
                                </div>

                                <button 
                                    type="submit" 
                                    class="btn btn-primary w-100" 
                                    [disabled]="!loginForm.valid || loading">
                                    {{ loading ? 'Logging in...' : 'Login' }}
                                </button>

                                <div class="mt-3 text-center">
                                    <p>Don't have an account? <a routerLink="/register">Register here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class LoginComponent {
    credentials: ILoginCredentials = {
        emailAddress: '',
        password: ''
    };
    loading = false;
    error = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit(): void {
        this.loading = true;
        this.error = '';

        this.authService.login(this.credentials).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.loading = false;
                this.error = 'Invalid email or password';
                console.error('Login error:', err);
            }
        });
    }
}