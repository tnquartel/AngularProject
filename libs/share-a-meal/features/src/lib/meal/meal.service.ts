import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '@avans-nx-workshop/share-a-meal/entity';
import { AlertService, AlertType } from '@avans-nx-workshop/share-a-meal/ui';
import { IMeal } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Observable, of } from 'rxjs';

/**
 *
 *
 */
@Injectable({ providedIn: 'root' })
export class MealService extends EntityService<IMeal> {
    constructor(
        private alertService: AlertService,
        protected override http: HttpClient
    ) {
        super(http, environment.dataApiUrl, '/meal');
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
}
