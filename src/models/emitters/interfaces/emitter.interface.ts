import { Types } from 'mongoose';
import { AttendantEngineer } from '../../attendantEngineers/schemas/engineer.schema';

export interface IEmitter {
  readonly emitterId: string;
  readonly activator: Types.ObjectId | AttendantEngineer;
  readonly batteryLevel?: number;
}
