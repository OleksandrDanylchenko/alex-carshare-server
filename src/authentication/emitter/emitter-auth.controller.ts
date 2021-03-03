import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { EmitterJwtTokensService } from './jwt/emitter-jwt-tokens.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { CarEntity } from '../../models/cars/serializers/car.serializer';
import { Public } from '../../common/decorators/routes-privacy.decorator';

@Controller('/authentication/emitter')
export class EmitterAuthController {
  constructor(private tokenService: EmitterJwtTokensService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async authenticate(@Req() req: Request): Promise<{ emitterToken: string }> {
    const authenticatedCar = req.user as CarEntity;
    const emitterToken = await this.tokenService.generateAccessToken(
      authenticatedCar
    );
    return { emitterToken };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/unauthenticate')
  async unauthenticate(): Promise<{ isUnauthenticated: boolean }> {
    return { isUnauthenticated: true };
  }
}
