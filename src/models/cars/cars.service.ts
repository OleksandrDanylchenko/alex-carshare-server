import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarEntity } from './serializers/car.serializer';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository
  ) {}

  async getByVin(
    vin: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<CarEntity | null> {
    const car = await this.carsRepository.getOneWhere(
      { vin },
      relations,
      throwsException
    );
    return this.carsRepository.transform(car);
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<CarEntity[] | null> {
    const cars = await this.carsRepository.getAll(relations, throwsException);
    return this.carsRepository.transformMany(cars);
  }
}
