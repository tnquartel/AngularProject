import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateFoodItem,
    IFoodItem,
    IUpdateFoodItem,
    IUpsertFoodItem,
    IUserIdentity
} from '@avans-nx-workshop/shared/api';

export class CreateFoodItemDto implements ICreateFoodItem {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}

export class UpsertFoodItemDto implements IUpsertFoodItem {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsBoolean()
    @IsNotEmpty()
    isVega!: boolean;
}

export class UpdateFoodItemDto implements IUpdateFoodItem {
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    description!: string;
}
