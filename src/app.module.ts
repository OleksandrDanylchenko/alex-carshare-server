import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { MongoDbConfigModule } from './config/database/mongodb/config.module';
import { MongoDbDatabaseProviderModule } from './providers/database/mongodb/provider.module';
import { APP_GUARD } from '@nestjs/core';
import { HttpJwtAuthGuard } from './authentication/common/guards/http-jwt-auth.guard';
import { EngineersModule } from './models/attendantEngineers/engineers.module';
import { EmittersModule } from './models/emitters/emitters.module';

@Module({
  imports: [
    AppConfigModule,
    MongoDbConfigModule,
    MongoDbDatabaseProviderModule,
    EngineersModule,
    EmittersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
