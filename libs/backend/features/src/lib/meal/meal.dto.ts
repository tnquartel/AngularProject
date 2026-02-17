import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateMeal,
    IFoodItem,
    IUpdateMeal,
    IUpsertMeal,
    IUserIdentity,
    MealSort
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateMealDto implements ICreateMeal {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsBoolean()
    @IsNotEmpty()
    isVega!: boolean;

    @IsDate()
    // @IsNotEmpty()
    dateServed!: string;

    @IsString()
    @IsNotEmpty()
    sort!: MealSort;

    @IsString()
    mainImageUrl!: string;
}

export class UpsertMealDto implements IUpsertMeal {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsBoolean()
    @IsNotEmpty()
    isVega!: boolean;

    @IsString()
    @IsNotEmpty()
    dateServed!: string;

    @IsString()
    @IsNotEmpty()
    sort!: MealSort;

    @IsString()
    mainImageUrl!: string;

    cook!: IUserIdentity;
    fooditems!: [IFoodItem];
}

export class UpdateMealDto implements IUpdateMeal {
    @IsString()
    @IsOptional()
    title!: string;

    @IsString()
    @IsOptional()
    description!: string;

    @IsBoolean()
    @IsNotEmpty()
    isVega!: boolean;

    @IsString()
    @IsNotEmpty()
    dateServed!: string;

    @IsString()
    @IsNotEmpty()
    sort!: MealSort;

    @IsString()
    mainImageUrl!: string;
}
