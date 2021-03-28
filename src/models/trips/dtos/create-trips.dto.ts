import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ICar } from '../../cars/interfaces/car.interface';

export class CreateTripsDto {
  @IsString()
  @IsNotEmpty()
  readonly trippingCar: Types.ObjectId | ICar;
}
