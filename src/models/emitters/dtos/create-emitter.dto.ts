import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { IEmitter } from '../interfaces/emitter.interface';

export class CreateEmitterDto implements IEmitter {
  @IsString()
  @IsNotEmpty()
  readonly emitterId: string;

  @IsString()
  @IsNotEmpty()
  readonly activator: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly batteryLevel?: number;
}
