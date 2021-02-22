import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn
} from 'typeorm';

@Index('cars_pkey', ['id', 'vin'], { unique: true })
@Entity('cars')
export class Car extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column({ type: 'text', name: 'vin', unique: true })
  vin: string;

  @Column({ type: 'text', name: 'brand' })
  brand: string;

  @Column({ type: 'text', name: 'model' })
  model: string;

  @Column({ type: 'double', name: 'engineCapacity' })
  engineCapacity: string;

  @Column({ type: 'text', name: 'transmission' })
  transmission: string;

  @Column({ type: 'double', name: 'mileage' })
  mileage: string;

  @Column({ type: 'text', name: 'exteriorColor' })
  exteriorColor: string;

  @Column({ type: 'double', name: 'fuelTankCapacity' })
  fuelTankCapacity: number;

  @Column({ type: 'double', name: 'washingLiquidCapacity' })
  washingLiquidCapacity: number;
}
