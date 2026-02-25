import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './review.schema';
import { Game, GameSchema } from '../game/game.schema';
import { Developer, DeveloperSchema } from '../developer/developer.schema';
import { AuthModule } from '@avans-nx-workshop/backend/auth';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Review.name, schema: ReviewSchema },
            { name: Game.name, schema: GameSchema },
            { name: Developer.name, schema: DeveloperSchema }
        ]),
        AuthModule
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}