import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDocument } from './entities/message.schema';
import { Model } from 'mongoose';
@Injectable()
export class MessagesService {

  constructor(@InjectModel("Message") private readonly messageDocument : Model<MessageDocument>){}

  async create(createMessageDto: CreateMessageDto) {
    if(!createMessageDto.data && createMessageDto.data ==""){
      throw new HttpException("SHOULD BE HAVE A MESSAGE" , HttpStatus.NOT_ACCEPTABLE)
    }else{
      try{
        const newMessage = new this.messageDocument(createMessageDto) 
        return (await newMessage.save()).populate(["sender" , "receiver"])
      }catch(error){
        throw new HttpException("invalid message" , HttpStatus.NOT_ACCEPTABLE , {cause : error})
      }
     
    } 
  }

  async findAll(){
    return await this.messageDocument.find().populate(["sender" , "receiver"])
  }


  async findAllMessagesbetweenTwo(senderId : string , receiverId : string) {
    return await this.messageDocument.find({sender : senderId , receiver : receiverId});
  }

  async findOne(id: string) {
    try{
      return await this.messageDocument.findById(id)
    }catch(error){
      throw new HttpException("the message not found" , HttpStatus.NOT_FOUND ,{cause : error})
    }
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    try{
      return await this.messageDocument.updateOne({_id : id} , updateMessageDto)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'there is no message for update !!!',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async remove(id: string) {
    try{
      return await this.messageDocument.findByIdAndDelete(id)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'there is no message for delete !!!',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }
}
