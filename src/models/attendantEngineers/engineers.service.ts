import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { AttendantEngineer } from './schemas/engineer.schema';
import { Types } from 'mongoose';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { CreateEngineerDto, UpdateEngineerDto } from './dtos';
import { compareHash, createHash } from '../../common/utils/hashing.helper';
import { IEngineer } from './interfaces/engineer.interface';
import { EngineersRepository } from './engineers.repository';

@Injectable()
export class EngineersService {
  constructor(private readonly engineersRepository: EngineersRepository) {}

  public async findById(
    engineerId: Types.ObjectId | string
  ): Promise<AttendantEngineer> {
    const engineer = await this.engineersRepository.findOne(
      { _id: engineerId },
      [{ path: 'activatedEmitters' }]
    );

    if (!engineer) {
      throw new NotFoundException(
        `Engineer with id: ${engineerId} wasn't found!`
      );
    }

    return engineer;
  }

  public async findByLogin(login: string): Promise<AttendantEngineer> {
    return this.engineersRepository.findOne({ activationLogin: login });
  }

  public async findAll(
    paginationQuery: PaginationQuery
  ): Promise<AttendantEngineer[]> {
    return this.engineersRepository.find({}, paginationQuery);
  }

  public async create(
    createEngineerDto: CreateEngineerDto
  ): Promise<AttendantEngineer> {
    try {
      const hashedEngineer = await this.hashActivationPassword(
        createEngineerDto
      );
      return await this.engineersRepository.create(
        hashedEngineer as AttendantEngineer
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    engineerId: Types.ObjectId | string,
    updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    try {
      const emitter = await this.findById(engineerId);

      let updateEngineer = updateEngineerDto;
      if (
        await compareHash(
          updateEngineerDto.activationPassword,
          emitter.activationPassword
        )
      ) {
        updateEngineer = await this.hashActivationPassword(updateEngineerDto);
      }

      const engineer = await this.engineersRepository.findOneAndUpdate(
        { _id: engineerId },
        updateEngineer,
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
    await this.update(engineerId, engineer);
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

  public async remove(engineerId: Types.ObjectId | string): Promise<unknown> {
    try {
      const engineer = await this.findById(engineerId);
      return engineer.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
