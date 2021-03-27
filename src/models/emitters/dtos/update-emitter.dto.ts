import { PartialType } from '@nestjs/mapped-types';
import { CreateEmitterDto } from './create-emitter.dto';
import { IsDate, IsOptional, MaxDate, MinDate } from 'class-validator';

export class UpdateEmitterDto extends PartialType(CreateEmitterDto) {
  @IsDate()
  @MaxDate(new Date())
  @IsOptional()
  readonly activatedAt?: Date;

  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  readonly deactivatedAt?: Date;
}
