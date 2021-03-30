import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Emitter } from './schemas/emitter.schema';
import { Model } from 'mongoose';
import { SchemaRepository } from '../common/repositories/schema.repository';

@Injectable()
export class EmittersRepository extends SchemaRepository<Emitter> {
  constructor(
    @InjectModel(Emitter.name)
    private readonly emitterModel: Model<Emitter>
  ) {
    super(emitterModel);
  }

  public async findByEmitterId(emitterId: string): Promise<Emitter> {
    return this.findOne({ emitterId }, [
      { path: 'activator', select: ['name', 'surname', 'activationLogin'] }
    ]);
  }
}
