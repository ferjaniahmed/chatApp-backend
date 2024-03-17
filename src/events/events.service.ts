import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class EventsService {
  constructor(private readonly messageService :   MessagesService){}
  
  async create(createMessageDto : CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  async findAll(senderId :string , receiverId : string) {
    return await this.messageService.findAllMessagesbetweenTwo(senderId , receiverId) ;
  }

  update(id: number, updateEventDto) {  
    return `This action updates a #${id} event`;
  }

  async remove(id: string) {
    return await this.messageService.remove(id);
  }
}
