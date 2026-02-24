import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Injectable()
export class FriendsService {
    private readonly logger = new Logger(FriendsService.name);

    constructor(private neo4jService: Neo4jService) { }

    async syncUser(userId: string, name: string): Promise<void> {
        const query = `
            MERGE (u:User {id: $userId})
            SET u.name = $name
            RETURN u
        `;
        await this.neo4jService.runQuery(query, { userId, name });
        this.logger.log(`User synced: ${userId}`);
    }

    async addFriend(userId: string, friendId: string): Promise<boolean> {
        const query = `
            MATCH (u:User {id: $userId})
            MATCH (f:User {id: $friendId})
            MERGE (u)-[r:FRIENDS_WITH]->(f)
            MERGE (f)-[r2:FRIENDS_WITH]->(u)
            RETURN r, r2
        `;

        const result = await this.neo4jService.runQuery(query, { userId, friendId });
        this.logger.log(`Friendship created: ${userId} <-> ${friendId}`);
        return result.length > 0;
    }

    async removeFriend(userId: string, friendId: string): Promise<boolean> {
        const query = `
            MATCH (u:User {id: $userId})-[r:FRIENDS_WITH]-(f:User {id: $friendId})
            DELETE r
            RETURN count(r) as deleted
        `;

        const result = await this.neo4jService.runQuery(query, { userId, friendId });
        this.logger.log(`Friendship removed: ${userId} <-> ${friendId}`);
        return result.length > 0;
    }

    async getFriends(userId: string): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:FRIENDS_WITH]->(f:User)
        RETURN f.id as id, f.name as name
    `;

        const result = await this.neo4jService.runQuery(query, { userId });
        return result.map((record: any) => ({
            id: record.get('id'),
            name: record.get('name')
        }));
    }

    async areFriends(userId: string, friendId: string): Promise<boolean> {
        const query = `
            MATCH (u:User {id: $userId})-[:FRIENDS_WITH]->(f:User {id: $friendId})
            RETURN count(*) > 0 as areFriends
        `;

        const result = await this.neo4jService.runQuery(query, { userId, friendId });
        return result.length > 0 && result[0].get('areFriends');
    }

    async getFriendSuggestions(userId: string, limit = 5): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:FRIENDS_WITH]->()-[:FRIENDS_WITH]->(suggested:User)
        WHERE suggested.id <> $userId
        AND NOT (u)-[:FRIENDS_WITH]->(suggested)
        RETURN suggested.id as id, suggested.name as name, count(*) as mutualFriends
        ORDER BY mutualFriends DESC
        LIMIT $limit
    `;

        const result = await this.neo4jService.runQuery(query, { userId, limit });
        return result.map((record: any) => ({
            id: record.get('id'),
            name: record.get('name'),
            mutualFriends: record.get('mutualFriends').toNumber()
        }));
    }
}