import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfigService } from '../../../config/authentication/config.service';

export interface IEmitterJwtPayload {
  sub: string;
  vin: string;
}

export interface IEmitterJwtContent {
  carId: string;
  vin: string;
}

@Injectable()
export class EmitterJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwtSecret
    });
  }

  async validate(payload: IEmitterJwtPayload): Promise<IEmitterJwtContent> {
    return { carId: payload.sub, vin: payload.vin };
  }
}
