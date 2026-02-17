import { Component, Input } from '@angular/core';

@Component({
    selector: 'avans-nx-workshop-page-title',
    templateUrl: './page-title.component.html'
})
export class PageTitleComponent {
    @Input() title = '';
    @Input() introText = '';
}
