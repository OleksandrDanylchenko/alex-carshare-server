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
import { CarsService } from './cars.service';
import { PaginationQuery } from '../common/dtos/pagination-query';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { Car } from './schemas/car.schema';

@Controller('api/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  public async getAllCars(
    @Query() paginationQuery: PaginationQuery
  ): Promise<Car[]> {
    return this.carsService.findAll(paginationQuery);
  }

  @Get('/:vin')
  public async getCarById(@Param('vin') vin: string): Promise<Car> {
    return this.carsService.findByVin(vin);
  }

  @Post()
  public async addCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Put('/:vin')
  public async updateCar(
    @Param('vin') vin: string,
    @Body() updateCarDto: UpdateCarDto
  ): Promise<Car> {
    return this.carsService.update(vin, updateCarDto);
  }

  @Delete('/:vin')
  public async deleteCar(@Param('vin') vin: string): Promise<Car> {
    return this.carsService.remove(vin);
  }
}
