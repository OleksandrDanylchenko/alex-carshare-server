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
        MONGO_DB_CONNECTION_STRING: Joi.string()
      }),
      cache: true
    })
  ],
  providers: [ConfigService, MongodbConfigService],
  exports: [ConfigService, MongodbConfigService]
})
export class MongoDbConfigModule {}
