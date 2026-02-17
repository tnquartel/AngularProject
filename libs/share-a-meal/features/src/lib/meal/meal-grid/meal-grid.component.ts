import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../meal.service';
import { IMeal } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-meal-grid',
    templateUrl: './meal-grid.component.html'
})
export class MealGridComponent implements OnInit, OnDestroy {
    title = 'Meals';
    introText = 'Hier vind je een overzicht van maaltijden.';

    meals: IMeal[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private mealService: MealService) {}

    ngOnInit(): void {
        this.subscription = this.mealService.list().subscribe((results) => {
            console.log(results);
            this.meals = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
