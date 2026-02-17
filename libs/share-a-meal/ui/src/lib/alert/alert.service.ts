import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertType } from './alert.interface';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public alert$ = new BehaviorSubject<Alert | undefined>(undefined);

    showAlert(alert: Alert): void {
        console.log('showAlert', alert.type, alert.message);
        this.alert$.next(alert);
        setTimeout(() => {
            this.alert$.next(undefined);
        }, 4000);
    }

    success(message: string): void {
        this.showAlert({
            type: AlertType.Success,
            message,
            visible: true
        });
    }

    error(message: string): void {
        this.showAlert({
            type: AlertType.Error,
            message,
            visible: true
        });
    }
}
