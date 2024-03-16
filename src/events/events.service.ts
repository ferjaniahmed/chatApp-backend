import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class EventsService {
  constructor(private readonly messageService :   MessagesService){}
  
  async create(createMessageDto : CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  async findAll(user : any) {
    return await this.messageService.findAllMessagesbetweenTwo(user.id , user.id) ;
  }

  update(id: number, updateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
