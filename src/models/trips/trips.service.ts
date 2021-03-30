import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { Trip } from './schemas/trip.schema';
import { CreateTripsDto } from './dtos';
import { UpdateTripsDto } from './dtos/update-trips.dto';
import { Car } from '../cars/schemas/car.schema';
import { CarsService } from '../cars/cars.service';
import { TripsRepository } from './trips.repository';

@Injectable()
export class TripsService {
  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly carsService: CarsService
  ) {}

  public async findById(tripId: Types.ObjectId | string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({ _id: tripId }, [
      { path: 'car' }
    ]);

    if (!trip) {
      throw new NotFoundException(`Trip with id: ${tripId} wasn't found!`);
    }

    return trip;
  }

  public async findAll(paginationQuery: PaginationQuery): Promise<Trip[]> {
    return this.tripsRepository.find({}, paginationQuery);
  }

  public async create(createTripDto: CreateTripsDto): Promise<Trip> {
    try {
      return await this.tripsRepository.create(createTripDto as Trip);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    carId: Types.ObjectId | string,
    updateTripDto: UpdateTripsDto
  ): Promise<Trip> {
    try {
      const trip = await this.tripsRepository.findOneAndUpdate(
        { _id: carId },
        updateTripDto,
        { new: true }
      );

      if (!trip) {
        throw new NotFoundException(`Car with id: ${carId} wasn't found!`);
      }

      return trip;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async remove(carId: Types.ObjectId | string): Promise<any> {
    try {
      const trip = await this.findById(carId);
      await this.removeCarTrip((trip.trippingCar as Car)?._id?.toHexString());
      return trip.delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async removeCarTrip(trippingCarId?: Types.ObjectId): Promise<void> {
    if (trippingCarId) {
      await this.carsService.removeCarTrip(trippingCarId);
    }
  }
}
