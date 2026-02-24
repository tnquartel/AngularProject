import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './review.schema';
import { AuthModule } from '@avans-nx-workshop/backend/auth';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        AuthModule  
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}