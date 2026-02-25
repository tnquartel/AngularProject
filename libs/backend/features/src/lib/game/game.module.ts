import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game, GameSchema } from './game.schema';
import { Developer, DeveloperSchema } from '../developer/developer.schema';
import { AuthModule } from '@avans-nx-workshop/backend/auth';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Game.name, schema: GameSchema },
            { name: Developer.name, schema: DeveloperSchema } 
        ]),
        AuthModule
    ],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule {}