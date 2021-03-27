import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'attendant_engineers' })
export class AttendantEngineer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  activationLogin: string;

  @Prop({ required: true })
  activationPassword: string;
}

export const AttendantEngineerSchema = SchemaFactory.createForClass(
  AttendantEngineer
);
