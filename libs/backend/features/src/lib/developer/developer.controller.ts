import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { ICreateDeveloper, IUpdateDeveloper, IDeveloper } from '@avans-nx-workshop/shared/api';

@Controller('developer')
export class DeveloperController {
    constructor(private readonly developerService: DeveloperService) {}

    @Get()
    async findAll(): Promise<IDeveloper[]> {
        return this.developerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IDeveloper> {
        return this.developerService.findOne(id);
    }

    @Post()
    async create(@Body() createDeveloperDto: ICreateDeveloper): Promise<IDeveloper> {
        return this.developerService.create(createDeveloperDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDeveloperDto: IUpdateDeveloper
    ): Promise<IDeveloper> {
        return this.developerService.update(id, updateDeveloperDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<IDeveloper> {
        return this.developerService.delete(id);
    }
}