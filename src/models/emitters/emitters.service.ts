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

@Injectable()
export class EmittersService {
  constructor(
    @InjectModel(Emitter.name)
    private readonly emitterModel: Model<Emitter>,
    private readonly engineersService: EngineersService
  ) {}

  public async findById(emitterId: Types.ObjectId | string): Promise<Emitter> {
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

      await this.addEmitterForEngineer(
        newEmitterModel._id,
        createEmitterDto.activator as Types.ObjectId
      );

      return await newEmitterModel.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    emitterId: Types.ObjectId | string,
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

  public async remove(emitterId: Types.ObjectId | string): Promise<any> {
    try {
      const emitter = await this.findById(emitterId);
      const engineerId = (emitter.activator as AttendantEngineer)._id.toHexString();
      await this.removeEmitterForEngineer(emitter._id, engineerId);
      return emitter.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async addEmitterForEngineer(
    emitterId: Types.ObjectId,
    engineerId: Types.ObjectId
  ): Promise<void> {
    const engineer = await this.engineersService.findById(engineerId);
    (engineer.activatedEmitters as Types.ObjectId[]).push(emitterId);
    await this.engineersService.update(engineer._id, engineer);
  }

  private async substituteEmitterEngineers(
    emitterId: Types.ObjectId,
    previousEngineerId: Types.ObjectId,
    newEngineerId: Types.ObjectId
  ): Promise<void> {
    await this.removeEmitterForEngineer(emitterId, previousEngineerId);
    await this.addEmitterForEngineer(emitterId, newEngineerId);
  }

  private async removeEmitterForEngineer(
    emitterId: Types.ObjectId,
    engineerId: Types.ObjectId
  ): Promise<void> {
    const engineer = await this.engineersService.findById(engineerId);

    const activatedEmitters = engineer.activatedEmitters as Types.ObjectId[];
    activatedEmitters.splice(activatedEmitters.indexOf(emitterId), 1);

    engineer.activatedEmitters = activatedEmitters;
    await this.engineersService.update(engineer._id, engineer);
  }
}
