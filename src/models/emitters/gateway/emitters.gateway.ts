import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Client, Server } from 'socket.io';
import { SocketJwtAuthGuard } from '../../../authentication/common/guards/socket-jwt-auth.guard';
import { EmittersService } from '../emitters.service';

enum EmittersSocketEvents {
  UPDATE_GEODATA = 'updateGeodata'
}

@WebSocketGateway({ namespace: '/geodata' })
export class EmittersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private emittersService: EmittersService) {}

  private logger = new Logger('GeodataGateway');

  afterInit(server: Server): void {
    this.logger.log('Emitters gateway initialized');
  }

  handleConnection(client: Client, ...args: any[]): any {
    return this.emittersService
      .create({ emitterId: client.id, activator: args[0] })
      .catch((error) => {
        return error;
      });
  }

  handleDisconnect(client: Client): any {
    this.emittersService.remove(client.id).catch((error) => {
      return error;
    });
  }

  @UseGuards(SocketJwtAuthGuard)
  @SubscribeMessage(EmittersSocketEvents.UPDATE_GEODATA)
  handleUpdateGeodata(
    client: Client,
    message: {
      lat: number;
      lon: number;
    }
  ): void {
    console.log(client.id, message);
  }
}
