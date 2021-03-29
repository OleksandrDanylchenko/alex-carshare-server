import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendantEngineer } from './schemas/engineer.schema';
import { Model, Types } from 'mongoose';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { CreateEngineerDto, UpdateEngineerDto } from './dtos';
import { createHash } from '../../common/utils/hashing.helper';
import { IEngineer } from './interfaces/engineer.interface';

@Injectable()
export class EngineersService {
  constructor(
    @InjectModel(AttendantEngineer.name)
    private readonly engineerModel: Model<AttendantEngineer>
  ) {}

  public async findById(
    engineerId: Types.ObjectId | string
  ): Promise<AttendantEngineer> {
    const engineer = await this.engineerModel
      .findOne({ _id: engineerId })
      .populate('activatedEmitters')
      .exec();

    if (!engineer) {
      throw new NotFoundException(
        `Engineer with id: ${engineerId} wasn't found!`
      );
    }

    return engineer;
  }

  public async findOneWhere(
    where: Record<string, unknown>
  ): Promise<AttendantEngineer> {
    return this.engineerModel.findOne(where).exec();
  }

  public async findWhere(
    where: Record<string, unknown>,
    paginationQuery: PaginationQuery
  ): Promise<AttendantEngineer[]> {
    const { limit, offset } = paginationQuery;
    return this.engineerModel.find(where).skip(offset).limit(limit).exec();
  }

  public async create(
    createEngineerDto: CreateEngineerDto
  ): Promise<AttendantEngineer> {
    try {
      const hashedEngineer = await this.hashActivationPassword(
        createEngineerDto
      );
      const newEngineerModel = new this.engineerModel(hashedEngineer);
      return newEngineerModel.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    engineerId: Types.ObjectId | string,
    updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    try {
      const hashedEngineer = await this.hashActivationPassword(
        updateEngineerDto
      );

      const engineer = await this.engineerModel.findByIdAndUpdate(
        { _id: engineerId },
        hashedEngineer,
        { new: true }
      );

      if (!engineer) {
        throw new NotFoundException(
          `Engineer with id: ${engineerId} wasn't found!`
        );
      }

      return engineer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async addEmitterForEngineer(
    emitterId: Types.ObjectId,
    engineerId: Types.ObjectId
  ): Promise<void> {
    const engineer = await this.findById(engineerId);
    (engineer.activatedEmitters as Types.ObjectId[]).push(emitterId);
    await engineer.update();
  }

  public async removeEmitterForEngineer(
    emitterId: Types.ObjectId,
    engineerId: Types.ObjectId
  ): Promise<void> {
    const engineer = await this.findById(engineerId);

    const activatedEmitters = engineer.activatedEmitters as Types.ObjectId[];
    activatedEmitters.splice(activatedEmitters.indexOf(emitterId), 1);

    engineer.activatedEmitters = activatedEmitters;
    await engineer.update();
  }

  public async hashActivationPassword(
    engineerDto: Partial<IEngineer>
  ): Promise<Partial<IEngineer>> {
    if (!engineerDto.activationPassword) {
      return engineerDto;
    }

    const hashedPassword = await createHash(engineerDto.activationPassword);
    return { ...engineerDto, activationPassword: hashedPassword };
  }

  public async remove(engineerId: Types.ObjectId | string): Promise<any> {
    try {
      const engineer = await this.findById(engineerId);
      return engineer.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
