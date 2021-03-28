import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { IEmitter } from '../interfaces/emitter.interface';
import { Types } from 'mongoose';
import { IEngineer } from '../../attendantEngineers/interfaces/engineer.interface';
import { ICar } from '../../cars/interfaces/car.interface';

export class CreateEmitterDto implements IEmitter {
  @IsString()
  @IsNotEmpty()
  readonly emitterId: string;

  @IsString()
  @IsNotEmpty()
  readonly activator: Types.ObjectId | IEngineer;

  @IsString()
  @IsNotEmpty()
  readonly activatedCar: Types.ObjectId | ICar;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly batteryLevel?: number;
}
