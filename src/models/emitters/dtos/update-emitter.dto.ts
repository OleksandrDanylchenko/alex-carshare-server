import { PartialType } from '@nestjs/mapped-types';
import { CreateEmitterDto } from './create-emitter.dto';

export class UpdateEmitterDto extends PartialType(CreateEmitterDto) {}
