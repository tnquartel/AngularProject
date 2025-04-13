import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; // <-- Adjust path if needed

@Module({
  imports: [
    // 👇 Your MongoDB connection string goes here
    MongooseModule.forRoot('mongodb://localhost:27017/your-db-name'),
    UserModule, // 👈 Make sure UserModule is registered
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
