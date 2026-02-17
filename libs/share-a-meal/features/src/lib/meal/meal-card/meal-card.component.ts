import { Component } from '@angular/core';
import { IMeal } from '@avans-nx-workshop/shared/api';
import { CardItemComponent } from '@avans-nx-workshop/share-a-meal/common';

@Component({
    selector: 'avans-nx-workshop-meal-card',
    templateUrl: './meal-card.component.html'
})
export class MealCardComponent extends CardItemComponent<IMeal> {}
