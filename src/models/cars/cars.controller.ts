import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common';
import { CarEntity, defaultCarGroups } from './serializers/car.serializer';
import { Public } from '../../common/decorators/routes-privacy.decorator';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Public()
  @Get('/')
  @SerializeOptions({ groups: defaultCarGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<CarEntity[]> {
    return await this.carsService.getAll();
  }
}
