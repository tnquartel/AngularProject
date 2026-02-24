import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '@avans-nx-workshop/backend/auth';

@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @Post('sync')
    @UseGuards(AuthGuard)
    async syncUser(@Body() body: { userId: string; name: string }) {
        await this.friendsService.syncUser(body.userId, body.name);
        return { message: 'User synced to graph database' };
    }

    @Post(':userId/add/:friendId')
    @UseGuards(AuthGuard)
    async addFriend(
        @Param('userId') userId: string,
        @Param('friendId') friendId: string
    ) {
        const result = await this.friendsService.addFriend(userId, friendId);
        return { success: result, message: 'Friend added' };
    }

    @Delete(':userId/remove/:friendId')
    @UseGuards(AuthGuard)
    async removeFriend(
        @Param('userId') userId: string,
        @Param('friendId') friendId: string
    ) {
        const result = await this.friendsService.removeFriend(userId, friendId);
        return { success: result, message: 'Friend removed' };
    }

    @Get(':userId')
    async getFriends(@Param('userId') userId: string) {
        const friends = await this.friendsService.getFriends(userId);
        return { friends };
    }

    @Get(':userId/check/:friendId')
    async areFriends(
        @Param('userId') userId: string,
        @Param('friendId') friendId: string
    ) {
        const areFriends = await this.friendsService.areFriends(userId, friendId);
        return { areFriends };
    }

    @Get(':userId/suggestions')
    async getSuggestions(@Param('userId') userId: string) {
        const suggestions = await this.friendsService.getFriendSuggestions(userId);
        return { suggestions };
    }
}