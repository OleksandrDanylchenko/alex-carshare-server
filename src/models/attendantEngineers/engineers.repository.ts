import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaRepository } from '../common/repositories/schema.repository';
import { AttendantEngineer } from './schemas/engineer.schema';

@Injectable()
export class EngineersRepository extends SchemaRepository<AttendantEngineer> {
  constructor(
    @InjectModel(AttendantEngineer.name)
    private readonly attendantEngineerModel: Model<AttendantEngineer>
  ) {
    super(attendantEngineerModel);
  }
}
