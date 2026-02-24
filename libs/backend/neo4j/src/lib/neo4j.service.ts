import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
    private readonly logger = new Logger(Neo4jService.name);
    private driver: Driver;

    constructor() {
        const uri = process.env['NEO4J_URI'] || 'bolt://localhost:7687';
        const username = process.env['NEO4J_USERNAME'] || 'neo4j';
        const password = process.env['NEO4J_PASSWORD'] || 'ThomasQua03';

        this.logger.log(`Connecting to Neo4j at ${uri}`);

        this.driver = neo4j.driver(
            uri,
            neo4j.auth.basic(username, password)
        );

        // Test connection
        this.driver.verifyConnectivity()
            .then(() => this.logger.log('Neo4j connected successfully'))
            .catch(err => this.logger.error('Neo4j connection failed:', err));
    }

    getDriver(): Driver {
        return this.driver;
    }

    getSession(): Session {
        return this.driver.session();
    }

    async runQuery(query: string, params = {}): Promise<any> {
        const session = this.getSession();
        try {
            const result = await session.run(query, params);
            return result.records;
        } catch (error) {
            this.logger.error('Query error:', error);
            throw error;
        } finally {
            await session.close();
        }
    }

    async onApplicationShutdown() {
        await this.driver.close();
        this.logger.log('Neo4j driver closed');
    }
}