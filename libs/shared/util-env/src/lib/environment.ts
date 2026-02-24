import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    ROOT_DOMAIN_URL: 'http://localhost:4200',
    dataApiUrl: 'http://localhost:3000/api',
    MONGO_DB_CONNECTION_STRING: '***REMOVED***',
    NEO4J_URI: 'bolt://localhost:7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: '***REMOVED***'  // TODO github secret maken
};