import { IsNotEmpty, IsString } from 'class-validator';
import { IEngineer } from '../interfaces/engineer.interface';

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
}
