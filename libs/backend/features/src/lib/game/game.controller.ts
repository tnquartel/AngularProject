import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { GameService } from './game.service';
import { ICreateGame, IUpdateGame, IGame } from '@avans-nx-workshop/shared/api';
import { UseGuards } from '@nestjs/common';
import { AuthGuard  } from '@avans-nx-workshop/backend/auth';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGame> {
        return this.gameService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard ) 
    async create(@Body() createGameDto: ICreateGame): Promise<IGame> {
        return this.gameService.create(createGameDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard ) 
    async update(
        @Param('id') id: string,
        @Body() updateGameDto: IUpdateGame
    ): Promise<IGame> {
        return this.gameService.update(id, updateGameDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard ) 
    async delete(@Param('id') id: string): Promise<IGame> {
        return this.gameService.delete(id);
    }
}