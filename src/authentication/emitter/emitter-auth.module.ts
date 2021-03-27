import { Module } from '@nestjs/common';
import { EmitterJwtTokensModule } from './jwt/emitter-jwt-tokens.module';
import { EngineersModule } from '../../models/attendantEngineers/engineers.module';
import { EmitterAuthController } from './emitter-auth.controller';
import { EmitterAuthStrategy } from './emitter-auth.strategy';
import { EmitterAuthService } from './emitter-auth.service';

@Module({
  imports: [EmitterJwtTokensModule, EngineersModule],
  controllers: [EmitterAuthController],
  providers: [EmitterAuthStrategy, EmitterAuthService]
})
export class EmitterAuthModule {}
