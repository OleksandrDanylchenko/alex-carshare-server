import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AuthConfigModule } from './config/authentication/config.module';
import { LocationsModule } from './models/locations/locations.module';
import { MongoDbConfigModule } from './config/database/mongodb/config.module';
import { MongoDbDatabaseProviderModule } from './providers/database/mongodb/provider.module';
import { CarsModule } from './models/cars/cars.module';
import { EmitterAuthModule } from './authentication/emitter/emitter-auth.module';
import { APP_GUARD } from '@nestjs/core';
import { HttpJwtAuthGuard } from './authentication/common/guards/http-jwt-auth.guard';
import { IndicatorsGateway } from './models/indicators/indicators.gateway';

@Module({
  imports: [
    AppConfigModule,
    AuthConfigModule,
    CarsModule,
    MongoDbConfigModule,
    MongoDbDatabaseProviderModule,
    EmitterAuthModule,
    LocationsModule,
    IndicatorsGateway
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpJwtAuthGuard
    }
  ]
})
export class AppModule {}
