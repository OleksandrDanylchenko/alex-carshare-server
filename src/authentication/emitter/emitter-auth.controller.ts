import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { EmitterJwtTokensService } from './jwt/emitter-jwt-tokens.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { CarEntity } from '../../models/cars/serializers/car.serializer';

@Controller('/authentication/emitter')
export class EmitterAuthController {
  constructor(private tokenService: EmitterJwtTokensService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async login(@Req() req: Request): Promise<string> {
    const authenticatedCar = req.user as CarEntity;
    return this.tokenService.generateAccessToken(authenticatedCar);
  }
}
