import { Component } from '@angular/core';

@Component({
    selector: 'avans-nx-workshop-gridcontainer',
    template: `
        <!-- Gridcontainer -->
        <div class="container mx-auto py-8">
            <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 sm:gap-3">
                <ng-content></ng-content>
            </div>
        </div>
        <!-- End -->
    `
})
export class GridContainerComponent {}
