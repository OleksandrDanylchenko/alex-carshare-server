import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaRepository } from '../common/repositories/schema.repository';
import { Car } from './schemas/car.schema';

@Injectable()
export class CarsRepository extends SchemaRepository<Car> {
  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<Car>
  ) {
    super(carModel);
  }

  public async findByVin(vin: string): Promise<Car> {
    return this.findOne({ vin }, [{ path: 'emitter' }]);
  }
}
