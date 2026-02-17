import { Component } from '@angular/core';
import { BaseEditComponent } from '@avans-nx-workshop/share-a-meal/common';
import { IMeal, MealSort } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../meal.service';

@Component({
    selector: 'avans-nx-workshop-meal-edit',
    templateUrl: './meal-edit.component.html'
})
export class MealEditComponent extends BaseEditComponent<IMeal> {
    //
    // Let op dat de BaseEditComponent een item: T variabele heeft; deze bevat het item dat je wilt editen.
    //
    title = 'Meal edit component';

    mealSorts = [
        MealSort.Breakfast,
        MealSort.Lunch,
        MealSort.Dinner,
        MealSort.Other
    ];

    constructor(
        protected mealService: MealService,
        override readonly route: ActivatedRoute,
        override readonly router: Router
    ) {
        super(mealService, route, router);
    }
}
