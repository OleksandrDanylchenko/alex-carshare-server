import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITrip } from '../interfaces/trip.interface';
import { ICar } from '../../cars/interfaces/car.interface';
import { GeoPoint } from '../../common/schemas/geo-point.schema';
import * as mongoose from 'mongoose';

@Schema({
  collection: 'trips',
  timestamps: { createdAt: true, updatedAt: true }
})
export class Trip extends Document implements ITrip {
  @Prop({ type: GeoPoint, required: true })
  readonly startLocation: GeoPoint;

  @Prop({ type: GeoPoint, required: false })
  readonly endLocation?: GeoPoint;

  @Prop({ required: true })
  readonly totalDistance: number;

  @Prop({ required: true })
  readonly totalTime: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  })
  readonly trippingCar: Types.ObjectId | ICar;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
