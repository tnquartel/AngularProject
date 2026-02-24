import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { ICreateGame, IUpdateGame, IGame } from '@avans-nx-workshop/shared/api';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<GameDocument>
    ) {}

    async findAll(): Promise<IGame[]> {
        return this.gameModel.find().exec();
    }

    async findOne(id: string): Promise<IGame> {
        const game = await this.gameModel.findById(id).exec();
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }

    async create(createGameDto: ICreateGame): Promise<IGame> {
        const newGame = new this.gameModel(createGameDto);
        return newGame.save();
    }

    async update(id: string, updateGameDto: IUpdateGame): Promise<IGame> {
        const game = await this.gameModel
            .findByIdAndUpdate(id, updateGameDto, { new: true })
            .exec();
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }

    async delete(id: string): Promise<IGame> {
        const game = await this.gameModel.findByIdAndDelete(id).exec();
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }
}