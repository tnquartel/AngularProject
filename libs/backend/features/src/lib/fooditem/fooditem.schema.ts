import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IFoodItem, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type FoodItemDocument = FoodItem & Document;

@Schema()
export class FoodItem implements IFoodItem {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    isVega!: boolean;

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userOwner!: IUserIdentity;
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
