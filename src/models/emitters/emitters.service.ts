import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dtos/pagination-query-dto';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';
import { EngineersService } from '../attendantEngineers/engineers.service';
import { AttendantEngineer } from '../attendantEngineers/schemas/engineer.schema';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class EmittersService {
  constructor(
    @InjectModel(Emitter.name)
    private readonly emitterModel: Model<Emitter>,
    private readonly engineersService: EngineersService,
    private readonly carsService: CarsService
  ) {}

  public async findById(emitterId: Types.ObjectId): Promise<Emitter> {
    const emitter = await this.emitterModel
      .findOne({ _id: emitterId })
      .populate('activator', 'name surname activationLogin')
      .exec();

    if (!emitter) {
      throw new NotFoundException(
        `Emitter with id: ${emitterId} wasn't found!`
      );
    }

    return emitter;
  }

  public async findOneWhere(where: Record<string, unknown>): Promise<Emitter> {
    return this.emitterModel.findOne(where).exec();
  }

  public async findWhere(
    where: Record<string, unknown>,
    paginationQuery: PaginationQueryDto
  ): Promise<Emitter[]> {
    const { limit, offset } = paginationQuery;
    return this.emitterModel.find(where).skip(offset).limit(limit).exec();
  }

  public async create(createEmitterDto: CreateEmitterDto): Promise<Emitter> {
    try {
      const newEmitterModel = new this.emitterModel(createEmitterDto);

      await this.engineersService.addEmitterForEngineer(
        newEmitterModel._id,
        createEmitterDto.activator as Types.ObjectId
      );

      await this.carsService.addCarEmitter(
        createEmitterDto.activatedCar as Types.ObjectId,
        newEmitterModel._id
      );

      return await newEmitterModel.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    emitterId: Types.ObjectId,
    updateEmitterDto: UpdateEmitterDto
  ): Promise<Emitter> {
    try {
      const emitter = await this.findById(emitterId);
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

  public async remove(emitterId: Types.ObjectId): Promise<any> {
    try {
      const emitter = await this.findById(emitterId);
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
}
