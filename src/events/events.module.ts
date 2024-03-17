import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports : [MessagesModule],
  providers: [EventsGateway, EventsService],
  exports : [EventsService]
})
export class EventsModule {}
