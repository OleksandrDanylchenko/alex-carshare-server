import { Module } from '@nestjs/common';
import { GeodataGateway } from './geodata.gateway';

@Module({
  controllers: [],
  providers: [GeodataGateway],
  exports: []
})
export class GeodataModule {}
