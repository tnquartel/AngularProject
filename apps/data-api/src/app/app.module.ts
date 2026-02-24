import { Module } from '@nestjs/common';
import { BackendFeaturesModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { Neo4jModule } from '@avans-nx-workshop/backend/neo4j'; 

@Module({
    imports: [
        BackendFeaturesModule,
        AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection.on('error', () => {
                    Logger.log('error connecting ' + connection.url);
                });
                connection._events.connected();
                return connection;
            }
        }),
        UsersModule,
        Neo4jModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}