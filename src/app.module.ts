import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { EventsModule } from './events/events.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule , 
    MongooseModule.forRootAsync({
      useFactory : (configService : ConfigService)=>({
        uri : configService.get("DATABASE_URI")
      }),
      inject :[ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal : true
    }),
    MessagesModule,
    EventsModule,
    CacheModule.register({
      isGlobal : true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide : APP_INTERCEPTOR,
      useClass : CacheInterceptor
    }
  ],
})
export class AppModule {}
