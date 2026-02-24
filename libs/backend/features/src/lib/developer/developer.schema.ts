import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IDeveloper } from '@avans-nx-workshop/shared/api';

export type DeveloperDocument = Developer & Document;

@Schema()
export class Developer implements IDeveloper {
    _id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    dateFounded!: Date;

    @Prop({ required: true })
    summary!: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Game' }] })
    gameIds!: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviewIds!: string[];
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);