import { IEnvironment } from './environment.interface';

/**
 * avansfreecluster.yba6gk7.mongodb.net/
 * dtb share-a-meal
 * user & pwd in Atlas
 */

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://nxworkshop.azurewebsites.net/api',

    // MONGO_DB_CONNECTION_STRING: `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    MONGO_DB_CONNECTION_STRING: `mongodb+srv://samadmin:Password123@avansfreecluster.yba6gk7.mongodb.net/share-a-meal?retryWrites=true&w=majority`
};
