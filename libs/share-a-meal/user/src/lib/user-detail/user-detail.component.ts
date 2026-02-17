import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap, delay } from 'rxjs/operators';
import { UserService } from '../user.service';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-detail',
    templateUrl: './user-detail.component.html',
    styles: []
})
export class UserDetailComponent implements OnInit {
    user$: Observable<IUserInfo> | null = null;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.user$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.userService.read(params.get('id'))
            ),
            delay(500)
        );
    }

    showDetails(id: number): void {
        console.log('showDetails', id);
    }
}
