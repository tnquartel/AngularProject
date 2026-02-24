import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Developer, DeveloperSchema } from './developer.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }])
    ],
    controllers: [DeveloperController],
    providers: [DeveloperService],
    exports: [DeveloperService]
})
export class DeveloperModule {}