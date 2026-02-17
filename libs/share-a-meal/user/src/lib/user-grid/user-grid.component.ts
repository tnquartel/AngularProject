import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { initModals } from 'flowbite';

@Component({
    selector: 'avans-nx-workshop-user-grid',
    templateUrl: './user-grid.component.html'
})
export class UserGridComponent implements OnInit, OnDestroy {
    title = 'Users';
    introText =
        'Hier vind je een overzicht van de users in dit systeem. ' +
        'Selecteer een user om meer details te zien, of voeg iemand ' +
        'toe als vriend.';

    users: IUserInfo[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        initModals();

        this.subscription = this.userService.list().subscribe((results) => {
            this.users = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
