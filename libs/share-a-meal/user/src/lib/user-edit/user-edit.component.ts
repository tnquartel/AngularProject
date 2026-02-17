import { Component } from '@angular/core';
import { BaseEditComponent } from '@avans-nx-workshop/share-a-meal/common';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent extends BaseEditComponent<IUserInfo> {
    //
    title = 'User edit component';

    user: IUserInfo = {
        _id: '',
        name: '',
        emailAddress: '',
        password: '',
        isActive: true,
        profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        gender: UserGender.Unknown,
        role: UserRole.Unknown
    };
    genderOptions = [
        UserGender.Female,
        UserGender.Male,
        UserGender.None,
        UserGender.Unknown
    ];
    userRoles = [UserRole.Admin, UserRole.Guest, UserRole.Unknown];

    constructor(
        protected userService: UserService,
        override readonly route: ActivatedRoute,
        override readonly router: Router
    ) {
        super(userService, route, router);
    }
}

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { Subscription, of } from 'rxjs';
// import { switchMap, tap, delay } from 'rxjs/operators';
// import { UserService } from '../user.service';
// import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';

// @Component({
//     selector: 'avans-nx-workshop-user-edit',
//     templateUrl: './user-edit.component.html',
//     styles: []
// })
// export class UserEditComponent implements OnInit, OnDestroy {
//     user: IUserInfo = {
//         _id: '',
//         name: '',
//         emailAddress: '',
//         password: '',
//         isActive: true,
//         profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
//         gender: UserGender.Unknown,
//         role: UserRole.Unknown
//     };
//     genderOptions = [
//         UserGender.Female,
//         UserGender.Male,
//         UserGender.None,
//         UserGender.Unknown
//     ];
//     userRoles = [UserRole.Admin, UserRole.Guest, UserRole.Unknown];
//     title = '';
//     subs!: Subscription;

//     constructor(
//         private userService: UserService,
//         private route: ActivatedRoute,
//         private router: Router
//     ) {}

//     ngOnInit(): void {
//         console.log('ngOnInit');
//         this.subs = this.route.paramMap
//             .pipe(
//                 switchMap((params: ParamMap) => {
//                     // als we een nieuw item maken is er geen 'id'
//                     if (!params.get('id')) {
//                         console.log('GEEN id gevonden');
//                         // retourneer een nieuwe lege user
//                         return of(this.user);
//                     } else {
//                         console.log('WEL een id gevonden');
//                         // haal de user met gevraagde id via de api
//                         return this.userService.read(params.get('id'));
//                     }
//                 })
//             )
//             .subscribe((user: IUserInfo) => {
//                 this.user = user;
//                 this.title = user._id ? user.name : 'New User';
//             });
//     }

//     // Save user via the service
//     onSubmit(): void {
//         console.log('onSubmit', this.user);

//         if (this.user._id !== '') {
//             // A user with id must have been saved before, so it must be an update.
//             console.log('update user');
//             this.userService.update(this.user).subscribe((success) => {
//                 console.log(success);
//                 if (success) {
//                     this.router.navigate(['..'], { relativeTo: this.route });
//                 }
//             });
//         } else {
//             // A user without id has not been saved to the database before.
//             console.log('create user');
//             // const { _id, ...newUser } = this.user;
//             this.userService.create(this.user).subscribe((success) => {
//                 console.log(success);
//                 if (success) {
//                     this.router.navigate(['..'], { relativeTo: this.route });
//                 }
//             });
//         }
//     }

//     ngOnDestroy(): void {
//         if (this.subs) this.subs.unsubscribe();
//     }
// }
