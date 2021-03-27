import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IEngineer } from '../interfaces/engineer.interface';

@Schema({ collection: 'attendant_engineers' })
export class AttendantEngineer extends Document implements IEngineer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  activationLogin: string;

  @Prop({ required: true })
  activationPassword: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Emitter' }],
    default: []
  })
  activatedEmitters: string[];
}

export const AttendantEngineerSchema = SchemaFactory.createForClass(
  AttendantEngineer
);
