import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  private wss: Server;

  private logger = new Logger('ChatGateway');

  afterInit(server: Server): any {
    this.logger.log('Chat gateway initialized');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; message: string }
  ): void {
    this.wss.emit('chatToClient', message);
  }
}
