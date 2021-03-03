import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import configuration from './configuration';
import { MongodbConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        TYPEORM_MONGO_DB_CONNECTION: Joi.string().default('mongodb'),
        TYPEORM_MONGO_DB_CONNECTION_STRING: Joi.string(),
        TYPEORM_MONGO_DB_DATABASE: Joi.string(),
        TYPEORM_LOGGING: Joi.bool().default('false'),
        TYPEORM_SYNCHRONIZE: Joi.bool().default('false'),
        TYPEORM_MIGRATIONS_RUN: Joi.bool().default('true'),
        TYPEORM_MIGRATIONS: Joi.string(),
        TYPEORM_MIGRATIONS_DIR: Joi.string(),
        TYPEORM_ENTITIES: Joi.string(),
        TYPEORM_ENTITIES_DIR: Joi.string()
      }),
      cache: true
    })
  ],
  providers: [ConfigService, MongodbConfigService],
  exports: [ConfigService, MongodbConfigService]
})
export class MongoDbConfigModule {}
