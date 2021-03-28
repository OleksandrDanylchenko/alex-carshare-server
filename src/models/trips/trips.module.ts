import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip, TripSchema } from './schemas/trip.schema';
import { Schema } from 'mongoose';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Trip.name,
        useFactory: (): Schema => {
          const schema = TripSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-delete'), {
            overrideMethods: true,
            deletedAt: true,
            indexFields: ['deleteAt']
          });
          return schema;
        }
      }
    ]),
    CarsModule
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService]
})
export class TripsModule {}
