import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEngineerDto {
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
