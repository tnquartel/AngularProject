import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Verifies that user is logged in before navigating to routes.
 *
 */
@Injectable({ providedIn: 'root' })
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
    //
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        console.log('canActivate currentUser');
        return this.authService.currentUserInfo$.pipe(
            map((user) => {
                if (user && user.token) {
                    return true;
                } else {
                    console.log('No logged-in user, reroute to login');
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canActivateChild LoggedIn');
        return this.canActivate();
    }
}

// @Injectable()
// export class SaveEditedWorkGuard {
//     constructor(private modalService: NgbModal) {}

//     canDeactivate(): Promise<boolean> {
//         return this.modalService
//             .open(ModalLeaveYesNoComponent)
//             .result.then(() => true)
//             .catch(() => false)
//     }
// }
