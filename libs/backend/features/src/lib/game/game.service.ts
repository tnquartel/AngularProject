import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { Developer, DeveloperDocument } from '../developer/developer.schema';
import { ICreateGame, IUpdateGame, IGame } from '@avans-nx-workshop/shared/api';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<GameDocument>,
        @InjectModel(Developer.name) private developerModel: Model<DeveloperDocument>
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
        const savedGame = await newGame.save();

        if (createGameDto.developerIds && createGameDto.developerIds.length > 0) {
            await this.developerModel.updateMany(
                { _id: { $in: createGameDto.developerIds } },
                { $addToSet: { gameIds: savedGame._id } }
            );
        }
        
        return savedGame;
    }

    async update(id: string, updateGameDto: IUpdateGame): Promise<IGame> {
        const oldGame = await this.gameModel.findById(id).exec();
        if (!oldGame) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        if (updateGameDto.developerIds) {
            const oldDeveloperIds = (oldGame.developerIds || []).map(id => String(id));
            const newDeveloperIds = updateGameDto.developerIds.map(id => String(id));

            const removedDevelopers = oldDeveloperIds.filter(
                devId => !newDeveloperIds.includes(devId)
            );

            const addedDevelopers = newDeveloperIds.filter(
                devId => !oldDeveloperIds.includes(devId)
            );

            if (removedDevelopers.length > 0) {
                await this.developerModel.updateMany(
                    { _id: { $in: removedDevelopers } },
                    { $pull: { gameIds: id } }
                );
            }

            if (addedDevelopers.length > 0) {
                await this.developerModel.updateMany(
                    { _id: { $in: addedDevelopers } },
                    { $addToSet: { gameIds: id } }
                );
            }
        }

        const game = await this.gameModel
            .findByIdAndUpdate(id, updateGameDto, { new: true })
            .exec();
        
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }

    async delete(id: string): Promise<IGame> {
        const game = await this.gameModel.findById(id).exec();
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        if (game.developerIds && game.developerIds.length > 0) {
            await this.developerModel.updateMany(
                { _id: { $in: game.developerIds } },
                { $pull: { gameIds: id } }
            );
        }

        await this.gameModel.findByIdAndDelete(id).exec();
        return game;
    }
}