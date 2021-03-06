import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IEngineer } from '../interfaces/engineer.interface';
import { Types } from 'mongoose';
import { IEmitter } from '../../emitters/interfaces/emitter.interface';

export class CreateEngineerDto implements IEngineer {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @IsString()
  @IsNotEmpty()
  readonly activationLogin: string;

  @IsString()
  @IsNotEmpty()
  readonly activationPassword: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly activatedEmitters: (Types.ObjectId | IEmitter)[];
}
