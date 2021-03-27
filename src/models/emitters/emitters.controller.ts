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
import { EmittersService } from './emitters.service';
import { PaginationQueryDto } from '../general/dtos/pagination-query-dto';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';

@Controller('api/emitters')
export class EmittersController {
  constructor(private emittersService: EmittersService) {}

  @Get()
  public async getAllEmitters(
    @Query() paginationQuery: PaginationQueryDto
  ): Promise<Emitter[]> {
    return this.emittersService.findAll(paginationQuery);
  }

  @Get('/:id')
  public async getEmitter(@Param('id') emitterId: string): Promise<Emitter> {
    return this.emittersService.findOne(emitterId);
  }

  @Post()
  public async addEmitter(
    @Body() createEngineerDto: CreateEmitterDto
  ): Promise<Emitter> {
    return this.emittersService.create(createEngineerDto);
  }

  @Put('/:id')
  public async updateEmitter(
    @Param('id') emitterId: string,
    @Body() updateEngineerDto: UpdateEmitterDto
  ): Promise<Emitter> {
    return this.emittersService.update(emitterId, updateEngineerDto);
  }

  @Delete('/:id')
  public async deleteEmitter(@Param('id') customerId: string): Promise<any> {
    return this.emittersService.remove(customerId);
  }
}
