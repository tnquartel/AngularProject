import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { DeveloperModule } from './developer/developer.module';

@Module({
    imports: [
        GameModule,
        DeveloperModule
    ],
    exports: [
        GameModule,
        DeveloperModule
    ]
})
export class BackendFeaturesModule {}