import { Module } from '@nestjs/common';
import { LocationsGateway } from './locations.gateway';

@Module({
  controllers: [],
  providers: [LocationsGateway],
  exports: []
})
export class LocationsModule {}
