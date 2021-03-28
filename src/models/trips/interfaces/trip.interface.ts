import { Types } from 'mongoose';
import { ICar } from '../../cars/interfaces/car.interface';
import { GeoPoint } from '../../common/schemas/geo-point.schema';

export interface ITrip {
  readonly startLocation: GeoPoint;
  readonly endLocation?: GeoPoint;
  readonly totalDistance: number;
  readonly totalTime: number;
  readonly trippingCar: Types.ObjectId | ICar;
}
