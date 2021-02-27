import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../../models/cars/cars.repository';
import { Car } from '../../models/cars/entities/car.entity';
import { compareValues } from '../../common/utils/hashing.helper';

@Injectable()
export class EmitterAuthService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async validateExistingCar(vin: string, password: string): Promise<Car> {
    const car = await this.carsRepository.getOneWhere({ vin });
    if (!car) {
      return null;
    }

    const isPasswordMatching = await compareValues(password, car.password);
    if (isPasswordMatching) {
      return car;
    }
    return null;
  }
}
