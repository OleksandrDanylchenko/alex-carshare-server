import { Module } from '@nestjs/common';
import { AlertController } from './alert/alert.controller';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';

@Module({
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway],
  exports: []
})
export class LocationsModule {}
