import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';

@Injectable()
export class EmittersService {
  constructor(
    @InjectModel(Emitter.name)
    private readonly emitterModel: Model<Emitter>
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
      .populate('activator')
      .exec();

    if (!engineer) {
      throw new NotFoundException(
        `Emitter with id: ${emitterId} wasn't found!`
      );
    }

    return engineer;
  }

  public async create(createEmitterDto: CreateEmitterDto): Promise<Emitter> {
    debugger;
    const newEmitterModel = new this.emitterModel(createEmitterDto);
    return newEmitterModel.save();
  }

  public async update(
    emitterId: string,
    updateEmitterDto: UpdateEmitterDto
  ): Promise<Emitter> {
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
  }

  async remove(emitterId: string): Promise<any> {
    return this.emitterModel.findByIdAndRemove(emitterId);
  }
}
