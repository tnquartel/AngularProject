import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Developer, DeveloperDocument } from './developer.schema';
import { ICreateDeveloper, IUpdateDeveloper, IDeveloper } from '@avans-nx-workshop/shared/api';

@Injectable()
export class DeveloperService {
    constructor(
        @InjectModel(Developer.name) private developerModel: Model<DeveloperDocument>
    ) {}

    async findAll(): Promise<IDeveloper[]> {
        return this.developerModel.find().exec();
    }

    async findOne(id: string): Promise<IDeveloper> {
        const developer = await this.developerModel.findById(id).exec();
        if (!developer) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }
        return developer;
    }

    async create(createDeveloperDto: ICreateDeveloper): Promise<IDeveloper> {
        const newDeveloper = new this.developerModel(createDeveloperDto);
        return newDeveloper.save();
    }

    async update(id: string, updateDeveloperDto: IUpdateDeveloper): Promise<IDeveloper> {
        const developer = await this.developerModel
            .findByIdAndUpdate(id, updateDeveloperDto, { new: true })
            .exec();
        if (!developer) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }
        return developer;
    }

    async delete(id: string): Promise<IDeveloper> {
        const developer = await this.developerModel.findByIdAndDelete(id).exec();
        if (!developer) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }
        return developer;
    }
}