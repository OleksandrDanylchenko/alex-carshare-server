import { Types } from 'mongoose';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';

export interface IEngineer {
  readonly name: string;
  readonly surname: string;
  readonly activationLogin: string;
  readonly activationPassword: string;
  readonly activatedEmitters: (Types.ObjectId | IEmitter)[];
}
