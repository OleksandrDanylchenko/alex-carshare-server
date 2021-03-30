import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { Car } from './schemas/car.schema';
import { EmittersService } from '../emitters/emitters.service';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { Emitter } from '../emitters/schemas/emitter.schema';
import { CarsRepository } from './cars.repository';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepository: CarsRepository,
    @Inject(forwardRef(() => EmittersService))
    private readonly emittersService: EmittersService
  ) {}

  public async findByVin(vin: string): Promise<Car> {
    const car = await this.carsRepository.findByVin(vin);

    if (!car) {
      throw new NotFoundException(`Car with vin: ${vin} wasn't found!`);
    }

    return car;
  }

  public async findAll(paginationQuery: PaginationQuery): Promise<Car[]> {
    return this.carsRepository.find({}, paginationQuery);
  }

  public async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      return await this.carsRepository.create(createCarDto as Car);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(vin: string, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const car = await this.carsRepository.findOneAndUpdate(
        { vin },
        updateCarDto
      );

      if (!car) {
        throw new NotFoundException(`Car with vin: ${vin} wasn't found!`);
      }

      return car;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async addCarEmitter(
    carId: Types.ObjectId,
    emitterId: Types.ObjectId
  ): Promise<void> {
    const car = await this.carsRepository.findOne({ carId });
    car.emitter = emitterId;
    car.update();
  }

  public async remove(vin: string): Promise<unknown> {
    try {
      const car = await this.findByVin(vin);
      await this.removeCarEmitter((car.emitter as Emitter)?._id?.toHexString());
      return car.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async removeCarEmitter(carEmitterId?: Types.ObjectId): Promise<void> {
    if (carEmitterId) {
      await this.emittersService.removeById(carEmitterId);
    }
  }

  public async removeCarTrip(carId?: Types.ObjectId): Promise<void> {
    if (carId) {
      const car = await this.carsRepository.findOne({ carId });
      car.currentTrip = undefined;
      car.update();
    }
  }
}
