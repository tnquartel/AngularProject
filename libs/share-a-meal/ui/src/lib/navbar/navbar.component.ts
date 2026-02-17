import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite, Dropdown } from 'flowbite';
import { AuthService } from '@avans-nx-workshop/share-a-meal/auth';

@Component({
    selector: 'avans-nx-workshop-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavBarComponent implements OnInit {
    constructor(
        protected authService: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        // Hack om te zorgen dat popup in NavBar blijft werken
        this.router.events.subscribe(() => {
            console.log('router event triggered');
            initFlowbite();
        });
    }
}
