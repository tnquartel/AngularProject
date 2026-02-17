export enum AlertType {
    Success = 'Success',
    Warning = 'Warning',
    Error = 'Error'
}

export interface Alert {
    type: AlertType;
    message: string;
    visible: boolean;
    error?: {
        message: string;
        statusCode: number;
    };
}
