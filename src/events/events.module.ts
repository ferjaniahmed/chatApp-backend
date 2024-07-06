import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [MessagesModule , UsersModule],
  providers: [EventsGateway, EventsService],
  exports : [EventsService]
})
export class EventsModule {}
