import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';

@Index('cars_pkey', ['id', 'vin'], { unique: true })
@Entity('cars')
export class Car extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'text', name: 'vin', unique: true })
  vin: string;

  @Column({ type: 'text', name: 'brand' })
  brand: string;

  @Column({ type: 'text', name: 'model' })
  model: string;

  @Column({ type: 'float', name: 'engineCapacity' })
  engineCapacity: string;

  @Column({ type: 'text', name: 'transmission' })
  transmission: string;

  @Column({ type: 'integer', name: 'mileage' })
  mileage: string;

  @Column({ type: 'text', name: 'exteriorColor' })
  exteriorColor: string;

  @Column({ type: 'float', name: 'fuelTankCapacity' })
  fuelTankCapacity: number;

  @Column({ type: 'float', name: 'washingLiquidCapacity' })
  washingLiquidCapacity: number;
}
