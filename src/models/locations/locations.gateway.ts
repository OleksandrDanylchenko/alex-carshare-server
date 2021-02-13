import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// "Path" is used to change default "socket.io" prefix in connections
// "serveClient" if the getting of the library from the server will be allowed
@WebSocketGateway(3001, {
  path: '/websockets',
  serveClient: true,
  namespace: '/'
})
export class LocationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private wss: Server;

  private logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // // For only the requesting socket
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   // client.emit('msgToClient', text); The impl of socket.io
  //   return { event: 'msgToClient', data: text };
  // }

  // For all connected users
  @SubscribeMessage('msgToServer')
  handleMessageForEveryone(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text);
  }
}
