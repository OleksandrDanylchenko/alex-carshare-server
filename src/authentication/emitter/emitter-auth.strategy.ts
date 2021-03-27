import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EmitterAuthService } from './emitter-auth.service';
import { Request } from 'express';
import { AttendantEngineer } from '../../models/attendantEngineers/schemas/engineer.schema';

@Injectable()
export class EmitterAuthStrategy extends PassportStrategy(LocalStrategy) {
  constructor(private readonly authService: EmitterAuthService) {
    super({ usernameField: 'login', passReqToCallback: true });
  }

  async validate(
    req: Request,
    login: string,
    password: string
  ): Promise<AttendantEngineer> {
    debugger;
    const engineer = await this.authService.validateExistingEngineer(
      login,
      password
    );
    if (!engineer) {
      if (req.path.includes('/sign-in')) {
        throw new UnauthorizedException(
          'Car with provided VIN number or password cannot be found'
        );
      } else {
        throw new UnauthorizedException(
          'Car with provided password cannot be found'
        );
      }
    }
    return engineer;
  }
}
