import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarEntity } from './serializers/car.serializer';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly accountsRepository: CarsRepository
  ) {}

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<CarEntity[] | null> {
    const cars = await this.accountsRepository.getAll(
      relations,
      throwsException
    );
    return this.accountsRepository.transformMany(cars);
  }
}
