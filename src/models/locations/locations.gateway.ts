import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketJwtAuthGuard } from '../../authentication/common/guards/socket-jwt-auth.guard';

enum LocationsSocketEvents {
  UPDATE_LOCATION = 'updateLocation'
}

@WebSocketGateway({ namespace: '/locations' })
export class LocationsGateway implements OnGatewayInit {
  private logger = new Logger('LocationsGateway');

  afterInit(server: Server): any {
    this.logger.log('Locations gateway initialized');
  }

  @UseGuards(SocketJwtAuthGuard)
  @SubscribeMessage(LocationsSocketEvents.UPDATE_LOCATION)
  handleUpdateLocation(message: {
    lat: number;
    lon: number;
    vin: string;
  }): void {
    console.log(message);
  }
}
