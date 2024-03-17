import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection, WsException} from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Server , Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace : "events"})
export class EventsGateway implements OnGatewayConnection , OnGatewayDisconnect {

  private clients: Map<string, Socket> = new Map()

  private logger = new Logger()

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly eventsService: EventsService , 
  ) {}


  handleConnection(client: Socket, ...args: any[]) {
    client.emit("connection" , "You are connected to the server.")
    this.clients.set(client.id , client)
    console.log(this.clients.keys())
  }


  handleDisconnect(client: Socket) {
    this.clients.delete(client.id)
  }



  @SubscribeMessage("connection")
  connect(@ConnectedSocket() socket :Socket){
    socket.emit("connection" , "ou are connected to the server from the event Listener.")
  }

  

  @SubscribeMessage('createEvent')
  async create(@MessageBody() data : any , @ConnectedSocket() socket : Socket ) {
    const {receiverSocket , ...messageData} = data
    if(receiverSocket){
      this.server.to(receiverSocket).emit("connection" , messageData)
    }
    return await this.eventsService.create(messageData) ;
  }


  @SubscribeMessage('findAllMessage')
  async findAll(@ConnectedSocket() socket : Socket, @MessageBody() data : any){
    const {senderId , receiverId} = data
    if(senderId && receiverId){
      return await this.eventsService.findAll(senderId as string, receiverId as string)
    }else{
      throw new WsException("check your information query")
    }
    
    
  }


  @SubscribeMessage('deleteMessage')
  async delete(@ConnectedSocket() socket : Socket , @MessageBody("messageId") id : string){
    if(id){
      return await this.eventsService.remove(id)
    }else{
      throw new WsException("the message Id is required")
    }  
  }

}

