import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car, CarSchema } from './schemas/car.schema';
import { Schema } from 'mongoose';
import { EmittersModule } from '../emitters/emitters.module';
import { CarsRepository } from './cars.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Car.name,
        useFactory: (): Schema => {
          const schema = CarSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-delete'), {
            deletedAt: true,
            indexFields: ['deleteAt']
          });
          return schema;
        }
      }
    ]),
    forwardRef(() => EmittersModule)
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
  exports: [CarsService]
})
export class CarsModule {}
