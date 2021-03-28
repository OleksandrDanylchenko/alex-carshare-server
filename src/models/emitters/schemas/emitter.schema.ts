import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { IEmitter } from '../interfaces/emitter.interface';
import { IEngineer } from '../../attendantEngineers/interfaces/engineer.interface';

@Schema({
  collection: 'emitters',
  timestamps: { createdAt: true, updatedAt: true }
})
export class Emitter extends Document implements IEmitter {
  @Prop({ required: true, unique: true })
  readonly emitterId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttendantEngineer'
  })
  readonly activator: Types.ObjectId | IEngineer;

  @Prop({ required: false })
  readonly batteryLevel: number | null;

  @Prop()
  readonly activatedAt: Date;
}

export const EmitterSchema = SchemaFactory.createForClass(Emitter);
