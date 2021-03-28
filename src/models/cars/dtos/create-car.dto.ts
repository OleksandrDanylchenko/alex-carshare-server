import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { ICar } from '../interfaces/car.interface';
import { Types } from 'mongoose';
import { IAttribute } from '../../common/interfaces/attribute-patter.interface';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';
import { Optional } from '@nestjs/common';

export class CreateCarDto implements ICar {
  @IsString()
  @IsNotEmpty()
  readonly vin: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  readonly photoUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly emitter: Types.ObjectId | IEmitter;

  @IsString()
  @IsNotEmpty()
  @Optional()
  readonly currentTrip?: Types.ObjectId;

  @ArrayMinSize(1)
  readonly characteristics: IAttribute[];

  @ArrayMinSize(1)
  readonly indicatorsValues: IAttribute[];
}
