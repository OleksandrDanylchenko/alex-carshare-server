import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MongoDbConfigModule } from '../../../config/database/mongodb/config.module';
import { MongodbConfigService } from '../../../config/database/mongodb/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MongoDbConfigModule],
      useFactory: async (mongodbConfigService: MongodbConfigService) => ({
        type: mongodbConfigService.connection,
        url: mongodbConfigService.connectionString,
        database: mongodbConfigService.database,
        logging: mongodbConfigService.logging,
        synchronize: mongodbConfigService.synchronize,
        migrationsRun: mongodbConfigService.migrationsRun,
        entities: mongodbConfigService.entities,
        migrations: mongodbConfigService.migrations,
        ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }),
      inject: [MongodbConfigService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export class MongoDbDatabaseProviderModule {}
