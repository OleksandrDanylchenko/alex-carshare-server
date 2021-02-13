import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../../config/database/postgres/config.module';
import { PostgresConfigService } from '../../../config/database/postgres/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useFactory: async (postgresConfigService: PostgresConfigService) => ({
        name: postgresConfigService.name,
        type: postgresConfigService.type as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        logging: postgresConfigService.logging,
        synchronize: postgresConfigService.synchronize,
        migrationsRun: postgresConfigService.migrationsRun,
        entities: postgresConfigService.entities,
        migrations: postgresConfigService.migrations,
        subscribers: postgresConfigService.subscribers,
        ssl: {
          rejectUnauthorized: false
        }
      }),
      inject: [PostgresConfigService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export class PostgresDatabaseProviderModule {}
