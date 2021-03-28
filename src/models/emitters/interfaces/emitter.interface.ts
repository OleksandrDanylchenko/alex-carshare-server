import { Types } from 'mongoose';
import { IEngineer } from '../../attendantEngineers/interfaces/engineer.interface';
import { ICar } from '../../cars/interfaces/car.interface';

export interface IEmitter {
  readonly emitterId: string;
  readonly activator: Types.ObjectId | IEngineer;
  readonly activatedCar: Types.ObjectId | ICar;
  readonly batteryLevel?: number;
}
