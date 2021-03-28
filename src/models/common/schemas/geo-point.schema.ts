import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'geo_point' })
export class GeoPoint extends Document {
  @Prop({
    type: String,
    enum: ['Point'],
    required: true
  })
  readonly type: string;

  @Prop({
    type: [Number],
    required: true
  })
  readonly coordinates: number[];
}

export const GeoPointSchema = SchemaFactory.createForClass(GeoPoint);
