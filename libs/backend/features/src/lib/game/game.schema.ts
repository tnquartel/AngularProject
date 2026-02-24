import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IGame } from '@avans-nx-workshop/shared/api';

export type GameDocument = Game & Document;

@Schema()
export class Game implements IGame {
    _id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    summary!: string;

    @Prop({ required: true })
    genre!: string;

    @Prop({ required: true })
    releaseDate!: Date;

    @Prop({ required: true })
    price!: number;

    @Prop({ default: 0 })
    rating!: number;

    @Prop({ required: true })
    ageRating!: string;

    @Prop({ required: true })
    imageUrl!: string;

    @Prop({ default: false })
    completed!: boolean;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviewIds!: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Developer' }] })
    developerIds!: string[];
}

export const GameSchema = SchemaFactory.createForClass(Game);