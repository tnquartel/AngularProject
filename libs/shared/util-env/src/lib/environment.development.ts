import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://thomasquartel:ThomasQua03@all-my-games.3buywbo.mongodb.net/?appName=all-my-games'
};
