import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { DeveloperModule } from './developer/developer.module';
import { ReviewModule } from './review/review.module'; 

@Module({
    imports: [
        GameModule,
        DeveloperModule,
        ReviewModule
    ],
    exports: [
        GameModule,
        DeveloperModule,
        ReviewModule
    ]
})
export class BackendFeaturesModule {}