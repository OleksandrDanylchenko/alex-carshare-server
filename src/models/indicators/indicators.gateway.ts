import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

enum IndicatorsSocketEvents {
  UPDATE_INDICATORS = 'updateIndicators'
}

@WebSocketGateway({ namespace: '/indicators' })
export class IndicatorsGateway implements OnGatewayInit {
  private logger = new Logger('IndicatorsGateway');

  afterInit(server: Server): any {
    this.logger.log('Indicators gateway initialized');
  }

  @SubscribeMessage(IndicatorsSocketEvents.UPDATE_INDICATORS)
  handleUpdateLocation(message): void {
    console.log(message);
  }
}
