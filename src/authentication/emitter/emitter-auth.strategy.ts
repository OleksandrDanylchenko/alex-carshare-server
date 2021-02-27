import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EmitterAuthService } from './emitter-auth.service';
import { CarEntity } from '../../models/cars/serializers/car.serializer';

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
    const car = await this.authService.validateExistingCar(vin, password);
    if (!car) {
      throw new UnauthorizedException();
    }
    return car;
  }
}
