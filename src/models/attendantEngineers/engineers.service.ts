import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendantEngineer } from './schemas/engineer.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { CreateEngineerDto } from './dtos';
import { UpdateEngineerDto } from './dtos';
import { createHash } from '../../common/utils/hashing.helper';

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
    const hashedPassword = await createHash(
      createEngineerDto.activationPassword
    );

    const newEngineer = {
      ...createEngineerDto,
      activationPassword: hashedPassword
    };

    const newEngineerModel = new this.engineerModel(newEngineer);
    return newEngineerModel.save();
  }

  public async update(
    engineerId: string,
    updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    const existingEngineer = await this.engineerModel.findByIdAndUpdate(
      { _id: engineerId },
      updateEngineerDto
    );

    if (!existingEngineer) {
      throw new NotFoundException(`Customer #${engineerId} not found`);
    }

    return existingEngineer;
  }

  public async remove(customerId: string): Promise<any> {
    return this.engineerModel.findByIdAndRemove(customerId);
  }
}
