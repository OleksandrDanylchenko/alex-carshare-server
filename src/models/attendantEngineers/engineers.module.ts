import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttendantEngineer,
  AttendantEngineerSchema
} from './schemas/engineer.schema';
import { EngineersService } from './engineers.service';
import { EngineersController } from './engineers.controller';
import { Schema } from 'mongoose';
import { EngineersRepository } from './engineers.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: AttendantEngineer.name,
        useFactory: (): Schema => {
          const schema = AttendantEngineerSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-delete'), {
            overrideMethods: true,
            deletedAt: true,
            indexFields: ['deleteAt']
          });
          return schema;
        }
      }
    ])
  ],
  controllers: [EngineersController],
  providers: [EngineersService, EngineersRepository],
  exports: [EngineersService]
})
export class EngineersModule {}
