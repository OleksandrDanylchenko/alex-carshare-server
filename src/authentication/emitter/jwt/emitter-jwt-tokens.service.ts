import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { CarEntity } from '../../../models/cars/serializers/car.serializer';

@Injectable()
export class EmitterJwtTokensService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(car: CarEntity): Promise<string> {
    const carJwtData = {
      id: car._id.toString(),
      vin: car.vin
    };
    const opts: SignOptions = { subject: carJwtData.id };
    return this.jwtService.signAsync(carJwtData, opts);
  }
}
