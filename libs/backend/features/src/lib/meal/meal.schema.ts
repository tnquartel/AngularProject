import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MealSort, IUserInfo } from '@avans-nx-workshop/shared/api';
import { IMeal } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';
import { IFoodItem } from 'libs/shared/api/src/lib/models/fooditem.interface';

export type MealDocument = Meal & Document;

@Schema()
export class Meal implements IMeal {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    isVega!: boolean;

    @Prop({ required: true, default: new Date() })
    dateServed: Date = new Date();

    @Prop({ required: true, type: String })
    sort!: MealSort;

    @Prop({
        required: true,
        type: String,
        default:
            'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTxZx0M_okXvGiuPdor3nrZiNtrSOJdBmusigkE-JIbPs0SqFdx-NvfOOcp8SmO8L17RCk7t2DVKoniiHD5hfk'
    })
    mainImageUrl!: string;

    @Prop({
        required: false,
        type: [MongooseSchema.Types.ObjectId],
        ref: 'FoodItem',
        default: []
    })
    fooditems!: [IFoodItem];

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    cook!: IUserInfo;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
