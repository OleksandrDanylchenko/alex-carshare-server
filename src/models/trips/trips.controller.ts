import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { Trip } from './schemas/trip.schema';
import { CreateTripsDto } from './dtos';
import { UpdateTripsDto } from './dtos/update-trips.dto';

@Controller('api/trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  public async getAllTrips(
    @Query() paginationQuery: PaginationQuery
  ): Promise<Trip[]> {
    return this.tripsService.findWhere({}, paginationQuery);
  }

  @Get('/:id')
  public async getTripById(@Param('id') tripId: string): Promise<Trip> {
    return this.tripsService.findById(tripId);
  }

  @Post()
  public async addTrip(@Body() createTripDto: CreateTripsDto): Promise<Trip> {
    return this.tripsService.create(createTripDto);
  }

  @Put('/:id')
  public async updateTrip(
    @Param('id') tripId: string,
    @Body() updateTripDto: UpdateTripsDto
  ): Promise<Trip> {
    return this.tripsService.update(tripId, updateTripDto);
  }

  @Delete('/:id')
  public async deleteTrip(@Param('id') tripId: string): Promise<any> {
    return this.tripsService.remove(tripId);
  }
}
