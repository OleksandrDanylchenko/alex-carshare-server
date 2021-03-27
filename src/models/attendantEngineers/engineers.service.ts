import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendantEngineer } from './schemas/engineer.schema';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dtos/pagination-query-dto';
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
    paginationQuery: PaginationQueryDto
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
    engineerId: string,
    updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    try {
      const hashedEngineer = await this.hashActivationPassword(
        updateEngineerDto
      );

      const existingEngineer = await this.engineerModel.findByIdAndUpdate(
        { _id: engineerId },
        hashedEngineer,
        { new: true }
      );

      if (!existingEngineer) {
        throw new NotFoundException(
          `Engineer with id: ${engineerId} wasn't found!`
        );
      }

      return existingEngineer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

  async remove(customerId: string): Promise<any> {
    return this.engineerModel.findByIdAndRemove(customerId);
  }
}
