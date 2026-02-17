import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserCredentials } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
    loginForm!: FormGroup;
    // @Output() formSubmitted = new EventEmitter<IUserCredentials>();

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            emailAddress: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3)
            ])
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const userCredentials: IUserCredentials = this.loginForm.value;
            this.authService.login(userCredentials).subscribe((success) => {
                if (success) {
                    this.router.navigate(['/']);
                }
            });
        }
    }
}
