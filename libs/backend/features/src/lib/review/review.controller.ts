import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    Request,
    ForbiddenException
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ICreateReview, IUpdateReview, IReview } from '@avans-nx-workshop/shared/api';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@avans-nx-workshop/backend/auth';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

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
    @UseGuards(AuthGuard)
    async create(@Body() createReviewDto: ICreateReview): Promise<IReview> {
        return this.reviewService.create(createReviewDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() review: IUpdateReview,
        @Request() req: any
    ): Promise<IReview> {
        const existingReview = await this.reviewService.findOne(id);

        if (existingReview.userId !== req.user.sub) {
            throw new ForbiddenException('You can only edit your own reviews');
        }

        return this.reviewService.update(id, review);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Request() req: any
    ): Promise<IReview> {
        const existingReview = await this.reviewService.findOne(id);

        if (existingReview.userId !== req.user.sub) {
            throw new ForbiddenException('You can only delete your own reviews');
        }

        return this.reviewService.delete(id);
    }
}