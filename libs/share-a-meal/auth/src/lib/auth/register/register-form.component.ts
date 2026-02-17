import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { IUserRegistration } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

/**
 *
 */
interface UserInfoFormGroup extends FormGroup {
    value: IUserRegistration;
    controls: {
        username: AbstractControl;
        password: AbstractControl;
        emailAddress: AbstractControl;
    };
}

/**
 *
 */
@Component({
    selector: 'avans-nx-workshop-register-form',
    templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;
    @Output() formSubmitted = new EventEmitter<IUserRegistration>();

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Dit is een reactive form, die we opbouwen in de Component.
        this.registerForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            emailAddress: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        }) as FormGroup;
    }

    onSubmit(): void {
        console.log('onSubmit');
        if (this.registerForm.valid) {
            const registeredUser: IUserRegistration = this.registerForm.value;
            // this.formSubmitted.emit(registeredUser);
            this.authService.register(registeredUser).subscribe((success) => {
                if (success) {
                    // console.log('registration successful');
                    this.router.navigate(['/']);
                }
            });
        } else {
            console.error('registerForm invalid');
        }
    }
}
