import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmittersService } from './emitters.service';
import { EmittersController } from './emitters.controller';
import { Emitter, EmitterSchema } from './schemas/emitter.schema';
import { EngineersModule } from '../attendantEngineers/engineers.module';
import { Schema } from 'mongoose';
import { EmittersGateway } from './gateway/emitters.gateway';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Emitter.name,
        useFactory: (): Schema => {
          const schema = EmitterSchema;
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
    EngineersModule,
    forwardRef(() => CarsModule)
  ],
  controllers: [EmittersController],
  providers: [EmittersService, EmittersGateway],
  exports: [EmittersService]
})
export class EmittersModule {}
