import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { AuthConfigModule } from './config/authentication/config.module';
import { LocationsModule } from './models/locations/locations.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    AuthConfigModule,
    PostgresDatabaseProviderModule,
    LocationsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
