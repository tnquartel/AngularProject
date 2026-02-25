/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    ApiResponseInterceptor
} from '@avans-nx-workshop/backend/dto';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'http://localhost:4200',
            'https://*.vercel.app',
            process.env['FRONTEND_URL'] || ''
        ],
        credentials: true
    });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const port = process.env['PORT'] || 3000;

    const corsOptions: CorsOptions = {};
    app.enableCors(corsOptions);

    app.useGlobalInterceptors(new ApiResponseInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, '0.0.0.0');

    Logger.log(`Application running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
