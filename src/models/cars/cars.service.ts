import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dtos/pagination-query-dto';
import { Car } from './schemas/car.schema';
import { EmittersService } from '../emitters/emitters.service';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { Emitter } from '../emitters/schemas/emitter.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<Car>,
    private readonly emittersService: EmittersService
  ) {}

  public async findById(carId: Types.ObjectId | string): Promise<Car> {
    const car = await this.carModel
      .findOne({ _id: carId })
      .populate('emitter')
      .exec();

    if (!car) {
      throw new NotFoundException(`Car with id: ${carId} wasn't found!`);
    }

    return car;
  }

  public async findOneWhere(where: Record<string, unknown>): Promise<Car> {
    return this.carModel.findOne(where).exec();
  }

  public async findWhere(
    where: Record<string, unknown>,
    paginationQuery: PaginationQueryDto
  ): Promise<Car[]> {
    const { limit, offset } = paginationQuery;
    return this.carModel.find(where).skip(offset).limit(limit).exec();
  }

  public async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const newCarModel = new this.carModel(createCarDto);
      return newCarModel.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    carId: Types.ObjectId | string,
    updateCarDto: UpdateCarDto
  ): Promise<Car> {
    try {
      const car = await this.carModel.findByIdAndUpdate(
        { _id: carId },
        updateCarDto,
        { new: true }
      );

      if (!car) {
        throw new NotFoundException(`Car with id: ${carId} wasn't found!`);
      }

      return car;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async remove(carId: Types.ObjectId | string): Promise<any> {
    const car = await this.findById(carId);
    await this.removeCarEmitter((car.emitter as Emitter)?._id?.toHexString());
    return car.delete();
  }

  private async removeCarEmitter(
    carEmitterId?: Types.ObjectId | string
  ): Promise<void> {
    if (carEmitterId) {
      await this.emittersService.remove(carEmitterId);
    }
  }
}
