import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
    return this.carsService.getAll();
  }

  @Public()
  @Get('/:vin')
  @SerializeOptions({ groups: defaultCarGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async getByVim(@Param('vin') vin: string): Promise<CarEntity> {
    return this.carsService.getByVin(vin, [], true);
  }

  // @Public()
  // @Post('/')
  // @SerializeOptions({ groups: defaultCarGroups })
  // @UseInterceptors(ClassSerializerInterceptor)
  // async get(): Promise<CarEntity[]> {
  //   return await this.carsService.getAll();
  // }
}
