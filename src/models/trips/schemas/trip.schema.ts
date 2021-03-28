import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IGeolocation } from '../../geolocation/interfaces/geolocation.interface';
import { ITrip } from '../interfaces/trip.interface';
import { ICar } from '../../cars/interfaces/car.interface';

@Schema({
  collection: 'trips',
  timestamps: { createdAt: true, updatedAt: true }
})
export class Trip extends Document implements ITrip {
  @Prop({ required: true })
  readonly startLocation: IGeolocation;

  @Prop({ required: false })
  readonly endLocation?: IGeolocation;

  @Prop({ required: true })
  readonly totalDistance: number;

  @Prop({ required: true })
  readonly totalTime: number;

  @Prop({ required: true })
  readonly trippingCar: Types.ObjectId | ICar;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
