import { Module, Global } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { AuthModule } from '@avans-nx-workshop/backend/auth';

@Global()
@Module({
    imports: [AuthModule],
    controllers: [FriendsController, RecommendationsController],
    providers: [Neo4jService, FriendsService, RecommendationsService],
    exports: [Neo4jService, FriendsService, RecommendationsService]
})
export class Neo4jModule {}