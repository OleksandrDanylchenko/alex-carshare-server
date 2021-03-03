import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketJwtAuthGuard } from '../../authentication/common/guards/socket-jwt-auth.guard';

enum GeodataSocketEvents {
  UPDATE_GEODATA = 'updateGeodata'
}

@WebSocketGateway({ namespace: '/geodata' })
export class GeodataGateway implements OnGatewayInit {
  private logger = new Logger('GeodataGateway');

  afterInit(server: Server): any {
    this.logger.log('Geodata gateway initialized');
  }

  @UseGuards(SocketJwtAuthGuard)
  @SubscribeMessage(GeodataSocketEvents.UPDATE_GEODATA)
  handleUpdateGeodata(message: {
    lat: number;
    lon: number;
    vin: string;
  }): void {
    console.log(message);
  }
}
