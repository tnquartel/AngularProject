import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { AuthGuard } from '@avans-nx-workshop/backend/auth';

@Controller('recommendations')
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationsService) { }

    @Post('game/sync')
    @UseGuards(AuthGuard)
    async syncGame(@Body() body: { gameId: string; title: string; genre: string }) {
        await this.recommendationsService.syncGame(body.gameId, body.title, body.genre);
        return { message: 'Game synced to graph database' };
    }

    @Post('played')
    @UseGuards(AuthGuard)
    async recordPlayed(@Body() body: { userId: string; gameId: string; rating?: number }) {
        await this.recommendationsService.recordGamePlayed(body.userId, body.gameId, body.rating);
        return { message: 'Game play recorded' };
    }

    @Get('friends/:userId')
    async getRecommendationsByFriends(@Param('userId') userId: string) {
        const recommendations = await this.recommendationsService.getRecommendationsByFriends(userId);
        return { recommendations };
    }

    @Get('popular/:userId')
    async getPopularInNetwork(@Param('userId') userId: string) {
        const recommendations = await this.recommendationsService.getPopularInNetwork(userId);
        return { recommendations };
    }

    @Get('genre/:userId')
    async getRecommendationsByGenre(@Param('userId') userId: string) {
        const recommendations = await this.recommendationsService.getRecommendationsByGenre(userId);
        return { recommendations };
    }

    @Get('similar/:userId')
    async getSimilarUsers(@Param('userId') userId: string) {
        const similarUsers = await this.recommendationsService.getSimilarUsers(userId);
        return { similarUsers };
    }

    @Get('user/:userId/games')
    async getUserGames(@Param('userId') userId: string) {
        const games = await this.recommendationsService.getUserGames(userId);
        return { games };
    }

    @Get('user/:userId/completed-games')
    async getUserCompletedGames(@Param('userId') userId: string): Promise<string[]> {
        return this.recommendationsService.getUserCompletedGames(userId);
    }

    @Delete('played')
    async removeGamePlayed(@Body() body: { userId: string; gameId: string }): Promise<void> {
        return this.recommendationsService.removeGamePlayed(body.userId, body.gameId);
    }
}
