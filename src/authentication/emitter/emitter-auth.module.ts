import { EmitterJwtTokensModule } from './jwt/emitter-jwt-tokens.module';
import { Module } from '@nestjs/common';
import { EmitterAuthStrategy } from './emitter-auth.strategy';
import { EmitterAuthService } from './emitter-auth.service';
import { CarsModule } from '../../models/cars/cars.module';
import { EmitterAuthController } from './emitter-auth.controller';

@Module({
  imports: [EmitterJwtTokensModule, CarsModule],
  controllers: [EmitterAuthController],
  providers: [EmitterAuthStrategy, EmitterAuthService]
})
export class EmitterAuthModule {}
