import { Component, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { IEntity } from '@avans-nx-workshop/share-a-meal/entity';

@Component({
    selector: 'avans-nx-workshop-card-item',
    templateUrl: './card-item.component.html'
})
export class CardItemComponent<T extends IEntity> implements OnInit {
    @Input() public item!: T;

    ngOnInit(): void {
        initFlowbite();
    }
}
