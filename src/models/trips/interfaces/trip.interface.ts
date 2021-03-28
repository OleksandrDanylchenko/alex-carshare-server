import { IGeolocation } from '../../geolocation/interfaces/geolocation.interface';
import { Types } from 'mongoose';
import { ICar } from '../../cars/interfaces/car.interface';

export interface ITrip {
  readonly startLocation: IGeolocation;
  readonly endLocation?: IGeolocation;
  readonly totalDistance: number;
  readonly totalTime: number;
  readonly trippingCar: Types.ObjectId | ICar;
}
