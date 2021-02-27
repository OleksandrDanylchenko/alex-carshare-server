import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthConfigService } from '../../../config/authentication/config.service';
import { AuthConfigModule } from '../../../config/authentication/config.module';
import { EmitterJwtTokensService } from './emitter-jwt-tokens.service';
import { EmitterJwtStrategy } from './emitter-jwt-strategy';

@Module({
  imports: [
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtSecret
      }),
      inject: [AuthConfigService]
    })
  ],
  controllers: [],
  providers: [EmitterJwtStrategy, EmitterJwtTokensService]
})
export class EmitterJwtTokensModule {}
