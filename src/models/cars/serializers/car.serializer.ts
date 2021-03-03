import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ICar } from '../interfaces/car.interface';
import { Expose } from 'class-transformer';
import { Transmission } from '../entities/car.entity';

export const defaultCarGroups: string[] = [];
export const allCarGroups: string[] = [...defaultCarGroups, 'car.password'];

export class CarEntity extends ModelEntity implements ICar {
  @Expose()
  _id: string;

  @Expose()
  vin: string;

  @Expose({ groups: ['car.password'] })
  password: string;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  engineCapacity: number;

  @Expose()
  transmission: Transmission;

  @Expose()
  mileage: number;

  @Expose()
  exteriorColor: string;

  @Expose()
  fuelTankCapacity: number;

  @Expose()
  washingLiquidCapacity: number;
}
