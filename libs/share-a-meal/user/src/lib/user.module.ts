import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@avans-nx-workshop/share-a-meal/ui';
import { CommonModule } from '@avans-nx-workshop/share-a-meal/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserGridComponent
    },
    // Create/New
    {
        path: 'new',
        pathMatch: 'full',
        component: UserEditComponent
    },
    // Read bestaande user op basis van ID
    {
        path: ':id',
        pathMatch: 'full',
        component: UserDetailComponent
    },
    // Update bestaande user op basis van ID
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: UserEditComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AngularCommonModule,
        HttpClientModule,
        RouterLink,
        CommonModule,
        FormsModule,
        UiModule
    ],
    declarations: [
        UserGridComponent,
        UserDetailComponent,
        UserEditComponent,
        UserCardComponent
    ],
    providers: [UserService],
    exports: [UserGridComponent, UserDetailComponent, UserEditComponent]
})
export class UserModule {}
