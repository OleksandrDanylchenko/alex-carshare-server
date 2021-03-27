import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { IEmitter } from '../interfaces/emitter.interface';
import { Types } from 'mongoose';

export class CreateEmitterDto implements IEmitter {
  @IsString()
  @IsNotEmpty()
  readonly emitterId: string;

  @IsString()
  @IsNotEmpty()
  readonly activator: Types.ObjectId;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly batteryLevel?: number;
}
