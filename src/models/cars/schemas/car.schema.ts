import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ICar } from '../interfaces/car.interface';
import { IAttribute } from '../../common/interfaces/attribute-patter.interface';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';
import { ITrip } from '../../trips/interfaces/trip.interface';

@Schema({
  collection: 'cars',
  timestamps: { createdAt: true, updatedAt: true }
})
export class Car extends Document implements ICar {
  @Prop({ required: true, unique: true })
  readonly vin: string;

  @Prop({ required: true, index: true })
  readonly brandName: string;

  @Prop({ required: true, index: true })
  readonly modelName: string;

  @Prop({ required: true, index: true })
  readonly manufactureYear: number;

  @Prop({ required: false })
  readonly photoUrl?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emitter',
    required: false
  })
  emitter?: Types.ObjectId | IEmitter;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: false
  })
  currentTrip?: Types.ObjectId | ITrip;

  @Prop({ required: true, default: [], index: true })
  readonly characteristics: IAttribute[];

  @Prop({ required: true, default: [], index: true })
  readonly indicatorsValues: IAttribute[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
