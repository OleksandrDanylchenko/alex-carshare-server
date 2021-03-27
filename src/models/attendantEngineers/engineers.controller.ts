import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { EngineersService } from './engineers.service';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { AttendantEngineer } from './schemas/engineer.schema';
import { CreateEngineerDto, UpdateEngineerDto } from './dtos';

@Controller('api/engineers')
export class EngineersController {
  constructor(private engineersService: EngineersService) {}

  @Get()
  public async getAllEngineers(
    @Query() paginationQuery: PaginationQueryDto
  ): Promise<AttendantEngineer[]> {
    return this.engineersService.findAll(paginationQuery);
  }

  @Get('/:id')
  public async getEngineer(
    @Param('id') engineerId: string
  ): Promise<AttendantEngineer> {
    return this.engineersService.findOne(engineerId);
  }

  @Post()
  public async addEngineer(
    @Body() createEngineerDto: CreateEngineerDto
  ): Promise<AttendantEngineer> {
    return this.engineersService.create(createEngineerDto);
  }

  @Put('/:id')
  public async updateEngineer(
    @Param('id') engineerId: string,
    @Body() updateEngineerDto: UpdateEngineerDto
  ): Promise<AttendantEngineer> {
    return this.engineersService.update(engineerId, updateEngineerDto);
  }

  @Delete('/:id')
  public async deleteCustomer(@Param('id') customerId: string): Promise<any> {
    return this.engineersService.remove(customerId);
  }
}
