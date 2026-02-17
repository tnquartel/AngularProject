import { Component, LOCALE_ID } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterModule } from '@angular/router';
import { UiModule } from '@avans-nx-workshop/share-a-meal/ui';
import { CommonModule } from '@avans-nx-workshop/share-a-meal/common';
// import { AuthenticationModule } from '@avans-nx-workshop/share-a-meal/auth';
// import { HttpClientModule } from '@angular/common/http';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        UiModule,
        // HttpClientModule,
        // AuthenticationModule,
        CommonModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
    selector: 'avans-nx-workshop-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        initFlowbite();
    }
}
