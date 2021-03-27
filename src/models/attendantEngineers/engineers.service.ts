import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendantEngineer } from './schemas/engineer.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { CreateEngineerDto, UpdateEngineerDto } from './dtos';
import { createHash } from '../../common/utils/hashing.helper';
import { IEngineer } from './interfaces/engineer.interface';

@Injectable()
export class EngineersService {
  constructor(
    @InjectModel(AttendantEngineer.name)
    private readonly engineerModel: Model<AttendantEngineer>
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto
  ): Promise<AttendantEngineer[]> {
    const { limit, offset } = paginationQuery;
    return this.engineerModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(engineerId: string): Promise<AttendantEngineer> {
    const engineer = await this.engineerModel
      .findById({ _id: engineerId })
      .exec();

    if (!engineer) {
      throw new NotFoundException(
        `Engineer with id: ${engineerId} wasn't found!`
      );
    }

    return engineer;
  }

  public async create(
    createEngineerDto: CreateEngineerDto
  ): Promise<AttendantEngineer> {
    const hashedEngineer = await this.hashActivationPassword(createEngineerDto);
    const newEngineerModel = new this.engineerModel(hashedEngineer);
    return newEngineerModel.save();
  }

  public async update(
    engineerId: string,
    updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    const hashedEngineer = await this.hashActivationPassword(updateEngineerDto);

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
