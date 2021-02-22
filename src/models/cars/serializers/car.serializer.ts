import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ICar } from '../interfaces/car.interface';
import { Exclude, Expose } from 'class-transformer';
import { ObjectID } from 'typeorm';

export const defaultCarGroups: string[] = [];
export const allCarGroups: string[] = [...defaultCarGroups, 'car._id'];

export class CarEntity extends ModelEntity implements ICar {
  @Expose({ groups: ['car._id'] })
  _id: ObjectID;

  @Expose()
  id: string;

  @Expose()
  vin: string;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  engineCapacity: number;

  @Expose()
  transmission: string;

  @Expose()
  mileage: number;

  @Expose()
  exteriorColor: string;

  @Expose()
  fuelTankCapacity: number;

  @Expose()
  washingLiquidCapacity: number;
}
