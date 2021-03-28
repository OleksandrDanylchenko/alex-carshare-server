import { Types } from 'mongoose';
import { IAttribute } from '../../common/interfaces/attribute-patter.interface';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';

export interface ICar {
  readonly vin: string;
  readonly brandName: string;
  readonly modelName: string;
  readonly manufactureYear: number;
  readonly photoUrl?: string;
  readonly emitter?: Types.ObjectId | IEmitter;
  readonly currentTrip?: Types.ObjectId;
  readonly characteristics: IAttribute[];
  readonly indicatorsValues: IAttribute[];
}
