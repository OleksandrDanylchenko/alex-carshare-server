import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttendantEngineer,
  AttendantEngineerSchema
} from './schemas/engineer.schema';
import { EngineersService } from './engineers.service';
import { EngineersController } from './engineers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttendantEngineer.name, schema: AttendantEngineerSchema }
    ])
  ],
  controllers: [EngineersController],
  providers: [EngineersService],
  exports: [EngineersService]
})
export class EngineersModule {}
