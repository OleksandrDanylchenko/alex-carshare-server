import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ICar } from '../interfaces/car.interface';
import { IAttribute } from '../../common/interfaces/attribute-patter.interface';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';

@Schema({ collection: 'cars', timestamps: { createdAt: true } })
export class Car extends Document implements ICar {
  @Prop({ required: true, unique: true })
  readonly vin: string;

  @Prop({ required: false })
  readonly photoUrl?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emitter'
  })
  readonly emitter: Types.ObjectId | IEmitter;

  @Prop({ required: false })
  readonly currentTrip?: Types.ObjectId;

  @Prop({ required: true, default: [] })
  readonly characteristics: IAttribute[];

  @Prop({ required: true, default: [] })
  readonly indicatorsValues: IAttribute[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
