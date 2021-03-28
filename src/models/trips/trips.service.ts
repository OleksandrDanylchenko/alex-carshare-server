import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dtos/pagination-query-dto';
import { Trip } from './schemas/trip.schema';
import { CreateTripsDto } from './dtos';
import { UpdateTripsDto } from './dtos/update-trips.dto';
import { Car } from '../cars/schemas/car.schema';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly carsService: CarsService
  ) {}

  public async findById(tripId: Types.ObjectId | string): Promise<Trip> {
    const trip = await this.tripModel
      .findOne({ _id: tripId })
      .populate('car')
      .exec();

    if (!trip) {
      throw new NotFoundException(`Trip with id: ${tripId} wasn't found!`);
    }

    return trip;
  }

  public async findOneWhere(where: Record<string, unknown>): Promise<Trip> {
    return this.tripModel.findOne(where).exec();
  }

  public async findWhere(
    where: Record<string, unknown>,
    paginationQuery: PaginationQueryDto
  ): Promise<Trip[]> {
    const { limit, offset } = paginationQuery;
    return this.tripModel.find(where).skip(offset).limit(limit).exec();
  }

  public async create(createTripDto: CreateTripsDto): Promise<Trip> {
    try {
      const newTrip = new this.tripModel(createTripDto);
      return newTrip.save(); // TODO Rework
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    carId: Types.ObjectId | string,
    updateTripDto: UpdateTripsDto
  ): Promise<Trip> {
    try {
      const trip = await this.tripModel.findByIdAndUpdate(
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
