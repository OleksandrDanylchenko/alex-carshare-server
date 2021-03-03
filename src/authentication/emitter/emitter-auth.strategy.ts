import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EmitterAuthService } from './emitter-auth.service';
import { CarEntity } from '../../models/cars/serializers/car.serializer';
import { Request } from 'express';

@Injectable()
export class EmitterAuthStrategy extends PassportStrategy(LocalStrategy) {
  constructor(private readonly authService: EmitterAuthService) {
    super({ usernameField: 'vin', passReqToCallback: true });
  }

  async validate(
    req: Request,
    vin: string,
    password: string
  ): Promise<CarEntity> {
    debugger;
    const car = await this.authService.validateExistingCar(vin, password);
    if (!car) {
      if (req.path.includes('/authenticate')) {
        throw new UnauthorizedException(
          'Car with provided VIN number or password cannot be found'
        );
      } else {
        throw new UnauthorizedException(
          'Car with provided password cannot be found'
        );
      }
    }
    return car;
  }
}
