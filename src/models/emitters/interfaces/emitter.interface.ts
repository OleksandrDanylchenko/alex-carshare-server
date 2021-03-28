import { Types } from 'mongoose';
import { IEngineer } from '../../attendantEngineers/interfaces/engineer.interface';

export interface IEmitter {
  readonly emitterId: string;
  readonly activator: Types.ObjectId | IEngineer;
  readonly batteryLevel?: number;
}
