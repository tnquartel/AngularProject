import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,
    ROOT_DOMAIN_URL: 'http://localhost:4200',
    dataApiUrl: process.env['API_URL'] || 'https://your-app.onrender.com/api',
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://thomasquartel:ThomasQua03@all-my-games.3buywbo.mongodb.net/?appName=all-my-games',
    NEO4J_URI: 'neo4j+s://6d815ad2.databases.neo4j.io',
    NEO4J_USERNAME: '6d815ad2',
    NEO4J_PASSWORD: 'OL0_Z_my1cwJ7R8EeEGJSwlToegR_a8mshIHDFvt7qc'
};