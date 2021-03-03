import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConfigService } from '../../../config/authentication/config.service';
import { CarsService } from '../../../models/cars/cars.service';
import { CarEntity } from '../../../models/cars/serializers/car.serializer';

export interface IEmitterJwtPayload {
  sub: string;
  vin: string;
}

@Injectable()
export class EmitterHttpJwtStrategy extends PassportStrategy(
  Strategy,
  'httpJwtStrategy'
) {
  constructor(
    private authConfigService: AuthConfigService,
    private carsService: CarsService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwtSecret
    });
  }

  async validate(payload: IEmitterJwtPayload): Promise<CarEntity> {
    const car = await this.carsService.getByVin(payload.vin);
    if (!car) {
      throw new UnauthorizedException(
        `Car with provided ${payload.vin} hasn't been found`
      );
    }
    return car;
  }
}
