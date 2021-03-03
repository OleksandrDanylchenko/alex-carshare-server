import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length
} from 'class-validator';
import { Transmission } from '../entities/car.entity';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @Length(17, 17)
  vin: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsPositive()
  engineCapacity: number;

  @IsEnum(Transmission)
  transmission: Transmission;

  @IsInt()
  @IsPositive()
  mileage: number;

  @IsString()
  @IsNotEmpty()
  exteriorColor: string;

  @IsNumber()
  @IsPositive()
  fuelTankCapacity: number;

  @IsNumber()
  @IsPositive()
  washingLiquidCapacity: number;
}
