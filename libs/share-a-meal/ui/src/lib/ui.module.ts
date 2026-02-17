import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
    imports: [CommonModule, RouterLink],
    declarations: [
        NavBarComponent,
        FooterComponent,
        BreadcrumbComponent,
        AlertComponent,
        SpinnerComponent,
        PageTitleComponent
    ],
    providers: [AlertService],
    exports: [
        NavBarComponent,
        FooterComponent,
        BreadcrumbComponent,
        AlertComponent,
        SpinnerComponent,
        PageTitleComponent
    ]
})
export class UiModule {}
