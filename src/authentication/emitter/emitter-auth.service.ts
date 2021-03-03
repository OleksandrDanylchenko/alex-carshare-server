import { Injectable } from '@nestjs/common';
import { CarsService } from '../../models/cars/cars.service';
import { CarEntity } from '../../models/cars/serializers/car.serializer';

@Injectable()
export class EmitterAuthService {
  constructor(private readonly carsService: CarsService) {}

  async validateExistingCar(vin: string, password: string): Promise<CarEntity> {
    const car = await this.carsService.getByVin(vin.toUpperCase());
    if (!car) {
      return null;
    }

    // const isPasswordMatching = await compareValues(password, car.password);
    const isPasswordMatching = password === car.password;
    if (isPasswordMatching) {
      return car;
    }
    return null;
  }
}
