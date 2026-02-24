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
import { UseGuards } from '@nestjs/common';
import { AuthGuard  } from '@avans-nx-workshop/backend/auth';

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
    @UseGuards(AuthGuard )
    async create(@Body() createDeveloperDto: ICreateDeveloper): Promise<IDeveloper> {
        return this.developerService.create(createDeveloperDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard )
    async update(
        @Param('id') id: string,
        @Body() updateDeveloperDto: IUpdateDeveloper
    ): Promise<IDeveloper> {
        return this.developerService.update(id, updateDeveloperDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard )
    async delete(@Param('id') id: string): Promise<IDeveloper> {
        return this.developerService.delete(id);
    }
}