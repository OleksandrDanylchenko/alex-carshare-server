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
import { PaginationQueryDto } from '../common/dtos/pagination-query-dto';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { Car } from './schemas/car.schema';

@Controller('api/cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  public async getAllCars(
    @Query() paginationQuery: PaginationQueryDto
  ): Promise<Car[]> {
    return this.carsService.findWhere({}, paginationQuery);
  }

  @Get('/:id')
  public async getCarById(@Param('id') carId: string): Promise<Car> {
    return this.carsService.findById(carId);
  }

  @Post()
  public async addCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Put('/:id')
  public async updateCar(
    @Param('id') carId: string,
    @Body() updateCarDto: UpdateCarDto
  ): Promise<Car> {
    return this.carsService.update(carId, updateCarDto);
  }

  @Delete('/:id')
  public async deleteCar(@Param('id') carId: string): Promise<any> {
    return this.carsService.remove(carId);
  }
}
