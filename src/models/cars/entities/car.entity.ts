import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';
import { Transform } from 'class-transformer';

export enum Transmission {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  ROBOTIC = 'robotic'
}

@Index('cars_pkey', ['vin'], { unique: true })
@Entity('cars')
export class Car extends BaseEntity {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectID;

  @Column({ type: 'text', name: 'vin', unique: true, length: 17 })
  vin: string;

  @Column({ type: 'text', name: 'password', length: 12 })
  password: string;

  @Column({ type: 'text', name: 'brand' })
  brand: string;

  @Column({ type: 'text', name: 'model' })
  model: string;

  @Column({ type: 'double', name: 'engineCapacity' })
  engineCapacity: number;

  @Column({ type: 'enum', enum: Transmission, name: 'transmission' })
  transmission: Transmission;

  @Column({ type: 'integer', name: 'mileage' })
  mileage: number;

  @Column({ type: 'text', name: 'exteriorColor' })
  exteriorColor: string;

  @Column({ type: 'double', name: 'fuelTankCapacity' })
  fuelTankCapacity: number;

  @Column({ type: 'double', name: 'washingLiquidCapacity' })
  washingLiquidCapacity: number;
}
