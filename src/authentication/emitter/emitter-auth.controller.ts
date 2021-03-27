import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../common/decorators/routes-privacy.decorator';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AttendantEngineer } from '../../models/attendantEngineers/schemas/engineer.schema';
import { EmitterJwtTokensService } from './jwt/emitter-jwt-tokens.service';

@Controller('/api/authentication/emitter')
export class EmitterAuthController {
  constructor(private tokenService: EmitterJwtTokensService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async authenticate(@Req() req: Request): Promise<{ emitterToken: string }> {
    const authenticatedEngineer = req.user as AttendantEngineer;
    const emitterToken = await this.tokenService.generateAccessToken(
      authenticatedEngineer
    );
    return { emitterToken };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-out')
  async unauthenticate(): Promise<{ isUnauthenticated: boolean }> {
    return { isUnauthenticated: true };
  }
}
