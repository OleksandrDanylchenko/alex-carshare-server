import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AuthConfigModule } from './config/authentication/config.module';
import { LocationsModule } from './models/locations/locations.module';
import { MongoDbConfigModule } from './config/database/mongodb/config.module';
import { MongoDbDatabaseProviderModule } from './providers/database/mongodb/provider.module';
import { CarsModule } from './models/cars/cars.module';
import { EmitterAuthModule } from './authentication/emitter/emitter-auth.module';

@Module({
  imports: [
    AppConfigModule,
    AuthConfigModule,
    CarsModule,
    LocationsModule,
    MongoDbConfigModule,
    MongoDbDatabaseProviderModule,
    EmitterAuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
