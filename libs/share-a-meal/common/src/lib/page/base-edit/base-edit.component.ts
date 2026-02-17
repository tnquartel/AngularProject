import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IEntity, EntityService } from '@avans-nx-workshop/share-a-meal/entity';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'avans-nx-workshop-base-edit',
    template: ` <p>base component template</p> `,
    styles: []
})
export class BaseEditComponent<T extends IEntity> implements OnInit, OnDestroy {
    protected subs!: Subscription;
    protected item!: T;

    constructor(
        protected readonly entityService: EntityService<T>,
        protected readonly route: ActivatedRoute,
        protected readonly router: Router
    ) {}

    ngOnInit(): void {
        console.log('ngOnInit');
        this.subs = this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    // als we een nieuw item maken is er geen 'id'
                    if (!params.get('id')) {
                        console.log('GEEN id gevonden');
                        // retourneer een nieuwe lege item
                        return of({});
                    } else {
                        console.log('WEL een id gevonden');
                        // haal de item met gevraagde id via de api
                        return this.entityService.read(params.get('id'));
                    }
                })
            )
            .subscribe((item: any) => {
                this.item = item;
                console.log(item);
            });
    }

    // Save item via the service
    onSubmit(): void {
        console.log('onSubmit', this.item);

        if (this.item._id && this.item._id !== '') {
            // A item with id must have been saved before, so it must be an update.
            console.log('update item');
            this.entityService.update(this.item).subscribe((success) => {
                console.log(success);
                if (success) {
                    this.router.navigate(['..'], { relativeTo: this.route });
                }
            });
        } else {
            // A item without id has not been saved to the database before.
            console.log('create item');
            // const { _id, ...newitem } = this.item;
            this.entityService.create(this.item).subscribe((success) => {
                console.log(success);
                if (success) {
                    this.router.navigate(['..'], { relativeTo: this.route });
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subs) this.subs.unsubscribe();
    }
}
