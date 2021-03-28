import { ITrip } from '../interfaces/trip.interface';
import { IsNumber } from 'class-validator';

export class UpdateTripsDto
  implements Omit<ITrip, 'trippingCar' | 'startLocation'> {
  @IsNumber()
  readonly totalDistance: number;

  @IsNumber()
  readonly totalTime: number;
}
