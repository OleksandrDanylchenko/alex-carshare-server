import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ICar } from '../../cars/interfaces/car.interface';
import { ITrip } from '../interfaces/trip.interface';

export class CreateTripsDto implements Pick<ITrip, 'trippingCar'> {
  @IsString()
  @IsNotEmpty()
  readonly trippingCar: Types.ObjectId | ICar;
}
