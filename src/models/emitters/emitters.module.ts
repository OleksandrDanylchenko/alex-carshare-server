import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmittersService } from './emitters.service';
import { EmittersController } from './emitters.controller';
import { Emitter, EmitterSchema } from './schemas/emitter.schema';
import { EngineersModule } from '../attendantEngineers/engineers.module';
import { Schema } from 'mongoose';

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
    EngineersModule
  ],
  controllers: [EmittersController],
  providers: [EmittersService],
  exports: [EmittersService]
})
export class EmittersModule {}
