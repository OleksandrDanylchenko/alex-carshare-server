import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmittersService } from './emitters.service';
import { EmittersController } from './emitters.controller';
import { Emitter, EmitterSchema } from './schemas/emitter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Emitter.name, schema: EmitterSchema }])
  ],
  controllers: [EmittersController],
  providers: [EmittersService],
  exports: [EmittersService]
})
export class EmittersModule {}
