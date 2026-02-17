import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '@avans-nx-workshop/share-a-meal/entity';
import { AlertService, AlertType } from '@avans-nx-workshop/share-a-meal/ui';
import { IUserInfo, IUserRegistration } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 *
 *
 */
@Injectable({ providedIn: 'root' })
export class UserService extends EntityService<IUserInfo> {
    constructor(
        private alertService: AlertService,
        protected override http: HttpClient
    ) {
        super(http, environment.dataApiUrl, '/user');
    }

    override handleError = (error: HttpErrorResponse): Observable<any> => {
        console.log(error);
        this.alertService.showAlert({
            type: AlertType.Error,
            message: error.message,
            visible: true,
            error: {
                message: error.message,
                statusCode: error.status
            }
        });
        return of(false);
    };

    /**
     * Create the item.
     *
     * @param item Item to be created.
     */
    public override create(
        item: IUserRegistration,
        options?: any
    ): Observable<IUserInfo> {
        const endpoint = `${this.url}${this.endpoint}`;
        console.log(`override create ${endpoint}`);
        return this.http.post<IUserRegistration>(endpoint, item).pipe(
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }
}
