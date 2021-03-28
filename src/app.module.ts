import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { MongoDbConfigModule } from './config/database/mongodb/config.module';
import { MongoDbDatabaseProviderModule } from './providers/database/mongodb/provider.module';
import { APP_GUARD } from '@nestjs/core';
import { HttpJwtAuthGuard } from './authentication/common/guards/http-jwt-auth.guard';
import { EngineersModule } from './models/attendantEngineers/engineers.module';
import { EmittersModule } from './models/emitters/emitters.module';
import { EmitterAuthModule } from './authentication/emitter/emitter-auth.module';
import { CarsModule } from './models/cars/cars.module';
import { TripsModule } from './models/trips/trips.module';

@Module({
  imports: [
    AppConfigModule,
    MongoDbConfigModule,
    MongoDbDatabaseProviderModule,
    EngineersModule,
    EmittersModule,
    EmitterAuthModule,
    CarsModule,
    TripsModule
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
