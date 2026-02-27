import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import neo4j from 'neo4j-driver';

@Injectable()
export class RecommendationsService {
    private readonly logger = new Logger(RecommendationsService.name);

    constructor(private neo4jService: Neo4jService) { }

    async syncGame(gameId: string, title: string, genre: string): Promise<void> {
        const query = `
            MERGE (g:Game {id: $gameId})
            SET g.title = $title, g.genre = $genre
            RETURN g
        `;
        await this.neo4jService.runQuery(query, { gameId, title, genre });
        this.logger.log(`Game synced: ${title}`);
    }

    async recordGamePlayed(userId: string, gameId: string, rating?: number): Promise<void> {
        const params: any = { userId, gameId };

        let query = `
            MATCH (u:User {id: $userId})
            MATCH (g:Game {id: $gameId})
            MERGE (u)-[r:PLAYED]->(g)
        `;

        if (rating !== undefined) {
            query += ` SET r.rating = $rating`;
            params.rating = rating;
        }

        query += ` RETURN r`;

        await this.neo4jService.runQuery(query, params);
        this.logger.log(`User ${userId} played game ${gameId}`);
    }

    async getRecommendationsByFriends(userId: string, limit = 10): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:FRIENDS_WITH]->(friend:User)-[p:PLAYED]->(g:Game)
        WHERE NOT (u)-[:PLAYED]->(g)
        RETURN g.id as id, g.title as title, g.genre as genre, 
               count(friend) as friendsPlayed,
               avg(p.rating) as avgRating
        ORDER BY friendsPlayed DESC, avgRating DESC
        LIMIT $limit
    `;

        const result = await this.neo4jService.runQuery(query, {
            userId,
            limit: neo4j.int(limit)
        });
        return result.map((record: any) => ({
            id: record.get('id'),
            title: record.get('title'),
            genre: record.get('genre'),
            friendsPlayed: record.get('friendsPlayed').toNumber(),
            avgRating: record.get('avgRating')
        }));
    }

    async getPopularInNetwork(userId: string, limit = 10): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:FRIENDS_WITH*1..2]->(person:User)-[:PLAYED]->(g:Game)
        WHERE NOT (u)-[:PLAYED]->(g)
        RETURN g.id as id, g.title as title, g.genre as genre,
               count(person) as popularity
        ORDER BY popularity DESC
        LIMIT $limit
    `;

        const result = await this.neo4jService.runQuery(query, {
            userId,
            limit: neo4j.int(limit)
        });
        return result.map((record: any) => ({
            id: record.get('id'),
            title: record.get('title'),
            genre: record.get('genre'),
            popularity: record.get('popularity').toNumber()
        }));
    }

    async getRecommendationsByGenre(userId: string, limit = 10): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:PLAYED]->(played:Game)
        WITH u, collect(DISTINCT played.genre) as myGenres
        MATCH (g:Game)
        WHERE g.genre IN myGenres
        AND NOT (u)-[:PLAYED]->(g)
        RETURN g.id as id, g.title as title, g.genre as genre
        LIMIT $limit
    `;

        const result = await this.neo4jService.runQuery(query, {
            userId,
            limit: neo4j.int(limit)
        });
        return result.map((record: any) => ({
            id: record.get('id'),
            title: record.get('title'),
            genre: record.get('genre')
        }));
    }

    async getSimilarUsers(userId: string, limit = 5): Promise<any[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:PLAYED]->(g:Game)<-[:PLAYED]-(similar:User)
        WHERE similar.id <> $userId
        RETURN similar.id as id, similar.name as name,
               count(g) as gamesInCommon
        ORDER BY gamesInCommon DESC
        LIMIT $limit
    `;

        const result = await this.neo4jService.runQuery(query, {
            userId,
            limit: neo4j.int(limit)
        });
        return result.map((record: any) => ({
            id: record.get('id'),
            name: record.get('name'),
            gamesInCommon: record.get('gamesInCommon').toNumber()
        }));
    }

    async getUserGames(userId: string): Promise<any[]> {
        const query = `
            MATCH (u:User {id: $userId})-[p:PLAYED]->(g:Game)
            RETURN g.id as id, g.title as title, g.genre as genre, p.rating as rating
            ORDER BY p.rating DESC
        `;

        const result = await this.neo4jService.runQuery(query, { userId });
        return result.map((record: any) => ({
            id: record.get('id'),
            title: record.get('title'),
            genre: record.get('genre'),
            rating: record.get('rating')
        }));
    }

    async getUserCompletedGames(userId: string): Promise<string[]> {
        const query = `
        MATCH (u:User {id: $userId})-[:PLAYED]->(g:Game)
        RETURN g.id as gameId
    `;

        const result = await this.neo4jService.runQuery(query, { userId });

        return result.map((record: any) => record.get('gameId'));
    }

    async removeGamePlayed(userId: string, gameId: string): Promise<void> {
        const query = `
        MATCH (u:User {id: $userId})-[r:PLAYED]->(g:Game {id: $gameId})
        DELETE r
    `;

        await this.neo4jService.runQuery(query, { userId, gameId });
        this.logger.log(`Removed PLAYED relationship: User ${userId} -> Game ${gameId}`);
    }
}