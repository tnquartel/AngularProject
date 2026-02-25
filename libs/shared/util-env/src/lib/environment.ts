import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    ROOT_DOMAIN_URL: 'http://localhost:4200',
    dataApiUrl: 'http://localhost:3000/api',
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://thomasquartel:ThomasQua03@all-my-games.3buywbo.mongodb.net/?appName=all-my-games',
    NEO4J_URI: 'bolt://localhost:7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'ThomasQ03'  // TODO github secret maken
};