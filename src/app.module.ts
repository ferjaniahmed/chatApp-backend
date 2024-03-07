import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule , 
    MongooseModule.forRoot('mongodb://127.0.0.1/chatApp'),
    ConfigModule.forRoot({
      isGlobal : true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
