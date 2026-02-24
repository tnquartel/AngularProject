import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IReview, ReviewType } from '@avans-nx-workshop/shared/api';

export type ReviewDocument = Review & Document;

@Schema()
export class Review implements IReview {
    _id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true, min: 0, max: 10 })
    rating!: number;

    @Prop({ required: true, default: Date.now })
    datePlaced!: Date;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, enum: ReviewType })
    reviewType!: ReviewType;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
    reviewedEntityId!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);