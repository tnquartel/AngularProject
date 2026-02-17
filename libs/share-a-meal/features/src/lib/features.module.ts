import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { MealGridComponent } from './meal/meal-grid/meal-grid.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { UiModule } from '@avans-nx-workshop/share-a-meal/ui';
import { MealCardComponent } from './meal/meal-card/meal-card.component';
import { MealEditComponent } from './meal/meal-edit/meal-edit.component';
import { FooditemListComponent } from './fooditem/fooditem-list/fooditem-list.component';
import { FooditemDetailsComponent } from './fooditem/fooditem-details/fooditem-details.component';
import { FooditemEditComponent } from './fooditem/fooditem-edit/fooditem-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@avans-nx-workshop/share-a-meal/common';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'meal'
    },
    {
        path: 'meal',
        pathMatch: 'full',
        component: MealGridComponent
    },
    {
        path: 'meal/new',
        pathMatch: 'full',
        component: MealEditComponent
    },
    {
        path: 'meal/:id',
        pathMatch: 'full',
        component: MealDetailComponent
    },
    {
        path: 'meal/:id/edit',
        pathMatch: 'full',
        component: MealEditComponent
    }
];

@NgModule({
    imports: [
        AngularCommonModule,
        RouterModule.forChild(routes),
        RouterLink,
        HttpClientModule,
        FormsModule,
        CommonModule,
        UiModule
    ],
    declarations: [
        MealGridComponent,
        MealDetailComponent,
        MealCardComponent,
        MealEditComponent,
        FooditemListComponent,
        FooditemDetailsComponent,
        FooditemEditComponent
    ],
    providers: [MealService],
    exports: [MealGridComponent, MealDetailComponent]
})
export class FeaturesModule {}
