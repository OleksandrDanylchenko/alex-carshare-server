import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';
import { EngineersService } from '../attendantEngineers/engineers.service';

@Injectable()
export class EmittersService {
  constructor(
    @InjectModel(Emitter.name)
    private readonly emitterModel: Model<Emitter>,
    private readonly engineersService: EngineersService
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto
  ): Promise<Emitter[]> {
    const { limit, offset } = paginationQuery;
    return this.emitterModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(emitterId: string): Promise<Emitter> {
    const engineer = await this.emitterModel
      .findById({ _id: emitterId })
      .populate('activator', 'name surname activationLogin -_id')
      .exec();

    if (!engineer) {
      throw new NotFoundException(
        `Emitter with id: ${emitterId} wasn't found!`
      );
    }

    return engineer;
  }

  public async create(createEmitterDto: CreateEmitterDto): Promise<Emitter> {
    try {
      const engineer = await this.engineersService.findOne(
        createEmitterDto.activator.toHexString()
      );

      let newEmitterModel = new this.emitterModel(createEmitterDto);
      newEmitterModel = await newEmitterModel.save();

      engineer.activatedEmitters.push(newEmitterModel._id);
      await this.engineersService.update(engineer._id, engineer);

      return newEmitterModel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    emitterId: string,
    updateEmitterDto: UpdateEmitterDto
  ): Promise<Emitter> {
    try {
      const existingEmitter = await this.emitterModel.findByIdAndUpdate(
        { _id: emitterId },
        updateEmitterDto,
        { new: true }
      );

      if (!existingEmitter) {
        throw new NotFoundException(
          `Emitter with id: ${emitterId} wasn't found!`
        );
      }

      return existingEmitter;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(emitterId: string): Promise<any> {
    return this.emitterModel.findByIdAndRemove(emitterId);
  }
}
