import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { EmitterJwtTokensService } from './jwt/emitter-jwt-tokens.service';
import { Car } from '../../models/cars/entities/car.entity';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';

@Controller('/authentication/emitter')
export class EmitterAuthController {
  constructor(private tokenService: EmitterJwtTokensService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async login(@Req() req: Request): Promise<string> {
    const authenticatedCar = req.user as Car;
    return this.tokenService.generateAccessToken(authenticatedCar);
  }
}
