import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'avans-nx-workshop-alert',
    template: `
        <div
            *ngIf="alertService.alert$ | async as alert"
            class="mx-auto w-full"
            [ngClass]="{
                'text-red-800 bg-red-200 dark:text-red-400':
                    alert.type === 'Error',
                'text-orange-800 bg-orange-200 dark:text-orange-400':
                    alert.type === 'Warning',
                'text-green-800 bg-green-200 dark:text-green-400':
                    alert.type === 'Success'
            }"
        >
            <div
                class=" max-w-screen-xl p-4 mb-4 text-sm dark:bg-gray-800 "
                role="alert"
            >
                <span class="font-medium">{{ alert?.type }}!</span>
                {{ alert?.message }}
            </div>
        </div>
        <!--  -->
    `,
    styles: []
})
export class AlertComponent {
    constructor(protected alertService: AlertService) {}
}
