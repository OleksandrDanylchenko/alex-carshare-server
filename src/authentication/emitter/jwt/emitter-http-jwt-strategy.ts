import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConfigService } from '../../../config/authentication/config.service';
import { EngineersService } from '../../../models/attendantEngineers/engineers.service';
import { AttendantEngineer } from '../../../models/attendantEngineers/schemas/engineer.schema';

export interface IEmitterJwtPayload {
  sub: string;
  id: string;
  name: string;
  surname: string;
}

@Injectable()
export class EmitterHttpJwtStrategy extends PassportStrategy(
  Strategy,
  'httpJwtStrategy'
) {
  constructor(
    private authConfigService: AuthConfigService,
    private engineersService: EngineersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: authConfigService.jwtSecret
    });
  }

  async validate(payload: IEmitterJwtPayload): Promise<AttendantEngineer> {
    const engineer = await this.engineersService.findById(payload.id);
    if (!engineer) {
      throw new UnauthorizedException(
        `Engineer with provided ${payload.id} wasn't found`
      );
    }
    return engineer;
  }
}
