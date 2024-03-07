import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : "Message" , schema : MessageSchema}])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports : [MessagesService]
})
export class MessagesModule {}
