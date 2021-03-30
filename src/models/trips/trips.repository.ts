import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaRepository } from '../common/repositories/schema.repository';
import { Trip } from './schemas/trip.schema';

@Injectable()
export class TripsRepository extends SchemaRepository<Trip> {
  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>
  ) {
    super(tripModel);
  }
}
