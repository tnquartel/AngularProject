import { Component, Input } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { CardItemComponent } from '@avans-nx-workshop/share-a-meal/common';

@Component({
    selector: 'avans-nx-workshop-user-card',
    templateUrl: './user-card.component.html'
})
export class UserCardComponent extends CardItemComponent<IUserInfo> {}
