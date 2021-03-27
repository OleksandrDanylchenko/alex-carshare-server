import { Types } from 'mongoose';
import { Emitter } from '../../emitters/schemas/emitter.schema';

export interface IEngineer {
  readonly name: string;
  readonly surname: string;
  readonly activationLogin: string;
  readonly activationPassword: string;
  readonly activatedEmitters: (Types.ObjectId | Emitter)[];
}
