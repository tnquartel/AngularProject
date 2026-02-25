import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IRegisterData } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    template: `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3>Register</h3>
                        </div>
                        <div class="card-body">
                            <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
                                <div class="mb-3">
                                    <label for="name">Name</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        [(ngModel)]="userData.name" 
                                        name="name" 
                                        required>
                                </div>

                                <div class="mb-3">
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        [(ngModel)]="userData.emailAddress" 
                                        name="email" 
                                        required>
                                </div>

                                <div class="mb-3">
                                    <label for="age">Age</label>
                                    <input 
                                        type="number" 
                                        class="form-control" 
                                        [(ngModel)]="userData.age" 
                                        name="age" 
                                        required>
                                </div>

                                <div class="mb-3">
                                    <label for="phone">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        class="form-control" 
                                        [(ngModel)]="userData.phoneNumber" 
                                        name="phone" 
                                        required>
                                </div>

                                <div class="mb-3">
                                    <label for="password">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        [(ngModel)]="userData.password" 
                                        name="password" 
                                        required>
                                </div>

                                <div class="alert alert-danger" *ngIf="error">
                                    {{ error }}
                                </div>

                                <button 
                                    type="submit" 
                                    class="btn btn-success w-100" 
                                    [disabled]="!registerForm.valid || loading">
                                    {{ loading ? 'Registering...' : 'Register' }}
                                </button>

                                <div class="mt-3 text-center">
                                    <p>Already have an account? <a routerLink="/login">Login here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./auth.scss']
})
export class RegisterComponent {
    userData: IRegisterData = {
        name: '',
        emailAddress: '',
        password: '',
        age: 18,
        phoneNumber: ''
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

        this.authService.register(this.userData).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.loading = false;
                this.error = err.error?.message || 'Registration failed';
                console.error('Register error:', err);
            }
        });
    }
}