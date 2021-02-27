import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EmitterAuthService } from './emitter-auth.service';
import { Car } from '../../models/cars/entities/car.entity';

@Injectable()
export class EmitterAuthStrategy extends PassportStrategy(LocalStrategy) {
  constructor(private readonly authService: EmitterAuthService) {
    super({ usernameField: 'vin', passReqToCallback: true });
  }

  async validate(req: Request, vin: string, password: string): Promise<Car> {
    const car = await this.authService.validateExistingCar(vin, password);
    if (!car) {
      throw new UnauthorizedException();
    }
    return car;
  }
}
