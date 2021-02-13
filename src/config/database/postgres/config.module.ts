import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PostgresConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        TYPEORM_CONNECTION_NAME: Joi.string().default('default'),
        TYPEORM_CONNECTION: Joi.string()
          .valid('postgres', 'mysql', 'msserver')
          .default('postgres'),
        TYPEORM_PORT: Joi.number().integer().default(5432),
        TYPEORM_HOST: Joi.string().default('localhost'),
        TYPEORM_USERNAME: Joi.string().default('postgres'),
        TYPEORM_PASSWORD: Joi.string().default('postgres'),
        TYPEORM_DATABASE: Joi.string(),
        TYPEORM_LOGGING: Joi.bool().default('false'),
        TYPEORM_SYNCHRONIZE: Joi.bool().default('false'),
        TYPEORM_MIGRATIONS_RUN: Joi.bool().default('true'),
        TYPEORM_MIGRATIONS: Joi.string(),
        TYPEORM_MIGRATIONS_DIR: Joi.string(),
        TYPEORM_ENTITIES: Joi.string(),
        TYPEORM_ENTITIES_DIR: Joi.string(),
        TYPEORM_SUBSCRIBERS: Joi.string(),
        TYPEORM_SUBSCRIBERS_DIR: Joi.string()
      }),
      cache: true
    })
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService]
})
export class PostgresConfigModule {}
