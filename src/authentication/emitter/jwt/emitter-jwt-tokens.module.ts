import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthConfigService } from '../../../config/authentication/config.service';
import { AuthConfigModule } from '../../../config/authentication/config.module';
import { EmitterJwtTokensService } from './emitter-jwt-tokens.service';
import { EmitterHttpJwtStrategy } from './emitter-http-jwt-strategy';
import { EmitterSocketJwtStrategy } from './emitter-socket-jwt-strategy';
import { EngineersModule } from '../../../models/attendantEngineers/engineers.module';

@Module({
  imports: [
    AuthConfigModule,
    EngineersModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtSecret
      }),
      inject: [AuthConfigService]
    })
  ],
  controllers: [],
  providers: [
    EmitterHttpJwtStrategy,
    EmitterSocketJwtStrategy,
    EmitterJwtTokensService
  ],
  exports: [EmitterJwtTokensService]
})
export class EmitterJwtTokensModule {}
