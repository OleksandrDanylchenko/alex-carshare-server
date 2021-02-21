import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

// Namespace is something like endpoints for HTTP
@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway {
  @WebSocketServer()
  private wss: Server;

  sendToAll(msg: string): void {
    this.wss.emit('alertToClient', { type: 'Alert', message: msg });
  }
}
