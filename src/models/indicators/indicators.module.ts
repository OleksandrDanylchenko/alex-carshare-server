import { Module } from '@nestjs/common';
import { IndicatorsGateway } from './indicators.gateway';

@Module({
  controllers: [],
  providers: [IndicatorsGateway],
  exports: []
})
export class IndicatorsModule {}
