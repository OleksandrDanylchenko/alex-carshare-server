import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().min(12)
      }),
      cache: true
    })
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService]
})
export class AuthConfigModule {}
