import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IEngineer } from '../interfaces/engineer.interface';
import { Document } from 'mongoose';

@Schema({ collection: 'attendant_engineers' })
export class AttendantEngineer extends Document implements IEngineer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true, index: true })
  activationLogin: string;

  @Prop({ required: true })
  activationPassword: string;
}

export const AttendantEngineerSchema = SchemaFactory.createForClass(
  AttendantEngineer
);
