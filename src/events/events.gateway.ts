import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection} from '@nestjs/websockets';
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
    this.server.on("connection",()=>{
      this.clients.set(client.id , client)
    })
  }


  handleDisconnect(client: Socket) {
    this.clients.delete(client.id)
  }




  

  @SubscribeMessage('createEvent')
  async create(@MessageBody() data : any , @ConnectedSocket() socket : Socket) {
    
    if(socket.handshake.query.receiverSocket){
      const client = this.clients.get(socket.handshake.query.receiverSocket as string)
      if(client){
        client.emitWithAck('connection', data)
      }
    }
    return await this.eventsService.create(data);
  }


  @SubscribeMessage('findAllMessage')
  findAll(){
    
  }


  @SubscribeMessage('deleteMessage')
  delete(){
    
  }

}

