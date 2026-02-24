import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ICreateReview, IUpdateReview, IReview } from '@avans-nx-workshop/shared/api';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get()
    async findAll(
        @Query('entityId') entityId?: string,
        @Query('userId') userId?: string
    ): Promise<IReview[]> {
        if (entityId) {
            return this.reviewService.findByEntity(entityId);
        }
        if (userId) {
            return this.reviewService.findByUser(userId);
        }
        return this.reviewService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IReview> {
        return this.reviewService.findOne(id);
    }

    @Post()
    async create(@Body() createReviewDto: ICreateReview): Promise<IReview> {
        return this.reviewService.create(createReviewDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateReviewDto: IUpdateReview
    ): Promise<IReview> {
        return this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<IReview> {
        return this.reviewService.delete(id);
    }
}