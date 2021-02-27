import { EmitterJwtTokensModule } from './jwt/emitter-jwt-tokens.module';
import { Module } from '@nestjs/common';
import { EmitterAuthStrategy } from './emitter-auth.strategy';
import { EmitterAuthService } from './emitter-auth.service';

@Module({
  imports: [EmitterJwtTokensModule],
  controllers: [],
  providers: [EmitterAuthStrategy, EmitterAuthService]
})
export class EmitterAuthModule {}
