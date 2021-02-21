import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ICar } from '../interfaces/car.interface';
import { Expose } from 'class-transformer';

export const defaultCarGroups: string[] = [];
export const allCarGroups: string[] = [...defaultCarGroups];

export class CarEntity extends ModelEntity implements ICar {
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