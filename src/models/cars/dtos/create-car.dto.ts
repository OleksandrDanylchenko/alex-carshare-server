import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches
} from 'class-validator';
import { ICar } from '../interfaces/car.interface';
import { IAttribute } from '../../common/interfaces/attribute-patter.interface';
import { Optional } from '@nestjs/common';

export class CreateCarDto implements ICar {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d|=.*[A-Z])(?=.*[A-Z])[A-Z0-9]{17}$/i, {
    message:
      'VIN number should be correctly formatter as 17 alphanumeric characters'
  })
  readonly vin: string;

  @IsString()
  @IsNotEmpty()
  readonly brandName: string;

  @IsString()
  readonly modelName: string;

  @IsInt()
  @IsNotEmpty()
  readonly manufactureYear: number;

  @Optional()
  readonly photoUrl?: string;

  @ArrayMinSize(1)
  readonly characteristics: IAttribute[];

  @ArrayMinSize(1)
  readonly indicatorsValues: IAttribute[];
}
