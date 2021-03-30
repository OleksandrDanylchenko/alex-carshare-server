import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';
import { EngineersService } from '../attendantEngineers/engineers.service';
import { AttendantEngineer } from '../attendantEngineers/schemas/engineer.schema';
import { CarsService } from '../cars/cars.service';
import { EmittersRepository } from './emitters.repository';

@Injectable()
export class EmittersService {
  constructor(
    private readonly emitterRepository: EmittersRepository,
    private readonly engineersService: EngineersService,
    @Inject(forwardRef(() => CarsService))
    private readonly carsService: CarsService
  ) {}

  public async findByEmitterId(emitterId: string): Promise<Emitter> {
    const emitter = await this.emitterRepository.findByEmitterId(emitterId);

    if (!emitter) {
      throw new NotFoundException(
        `Emitter with id: ${emitterId} wasn't found!`
      );
    }

    return emitter;
  }

  public async findAll(paginationQuery: PaginationQuery): Promise<Emitter[]> {
    return this.emitterRepository.find({}, paginationQuery);
  }

  public async create(createEmitterDto: CreateEmitterDto): Promise<Emitter> {
    let newEmitter = null;
    try {
      newEmitter = await this.emitterRepository.create(
        createEmitterDto as Emitter
      );

      await this.engineersService.addEmitterForEngineer(
        newEmitter._id,
        createEmitterDto.activator as Types.ObjectId
      );

      await this.carsService.addCarEmitter(
        createEmitterDto.activatedCar as Types.ObjectId,
        newEmitter._id
      );

      return newEmitter;
    } catch (error) {
      newEmitter?.remove();
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    emitterId: string,
    updateEmitterDto: UpdateEmitterDto
  ): Promise<Emitter> {
    try {
      const emitter = await this.findByEmitterId(emitterId);
      const previousEngineerId = (emitter.activator as AttendantEngineer)._id.toHexString();

      if (
        updateEmitterDto.activator &&
        updateEmitterDto.activator !== previousEngineerId
      ) {
        await this.substituteEmitterEngineers(
          emitter._id,
          previousEngineerId,
          updateEmitterDto.activator as Types.ObjectId
        );
      }

      return await emitter.update(updateEmitterDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async substituteEmitterEngineers(
    emitterId: Types.ObjectId,
    previousEngineerId: Types.ObjectId,
    newEngineerId: Types.ObjectId
  ): Promise<void> {
    await this.engineersService.removeEmitterForEngineer(
      emitterId,
      previousEngineerId
    );
    await this.engineersService.addEmitterForEngineer(emitterId, newEngineerId);
  }

  public async removeById(id: Types.ObjectId | string): Promise<unknown> {
    const emitter = await this.emitterRepository.findOne({ _id: id });
    return this.removeEmitter(emitter);
  }

  public async removeByEmitterId(emitterId: string): Promise<unknown> {
    const emitter = await this.findByEmitterId(emitterId);
    return this.removeEmitter(emitter);
  }

  private async removeEmitter(emitter: Emitter): Promise<unknown> {
    try {
      const engineerId = (emitter.activator as AttendantEngineer)._id.toHexString();
      await this.engineersService.removeEmitterForEngineer(
        emitter._id,
        engineerId
      );
      return emitter.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
