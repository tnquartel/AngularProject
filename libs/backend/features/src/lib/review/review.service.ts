import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { ICreateReview, IUpdateReview, IReview } from '@avans-nx-workshop/shared/api';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
    ) {}

    async findAll(): Promise<IReview[]> {
        return this.reviewModel.find().exec();
    }

    async findOne(id: string): Promise<IReview> {
        const review = await this.reviewModel.findById(id).exec();
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    // Find reviews by entity (game or developer)
    async findByEntity(entityId: string): Promise<IReview[]> {
        return this.reviewModel.find({ reviewedEntityId: entityId }).exec();
    }

    // Find reviews by user
    async findByUser(userId: string): Promise<IReview[]> {
        return this.reviewModel.find({ userId: userId }).exec();
    }

    async create(createReviewDto: ICreateReview): Promise<IReview> {
        const newReview = new this.reviewModel({
            ...createReviewDto,
            datePlaced: new Date()
        });
        return newReview.save();
    }

    async update(id: string, updateReviewDto: IUpdateReview): Promise<IReview> {
        const review = await this.reviewModel
            .findByIdAndUpdate(id, updateReviewDto, { new: true })
            .exec();
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    async delete(id: string): Promise<IReview> {
        const review = await this.reviewModel.findByIdAndDelete(id).exec();
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
}