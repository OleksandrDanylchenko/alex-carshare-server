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
import { PaginationQuery } from '../common/dtos/pagination-query';
import { CreateEmitterDto, UpdateEmitterDto } from './dtos';
import { Emitter } from './schemas/emitter.schema';

@Controller('api/emitters')
export class EmittersController {
  constructor(private emittersService: EmittersService) {}

  @Get()
  public async getAllEmitters(
    @Query() paginationQuery: PaginationQuery
  ): Promise<Emitter[]> {
    return this.emittersService.findAll(paginationQuery);
  }

  @Get('/:emitterId')
  public async getEmitter(
    @Param('emitterId') emitterId: string
  ): Promise<Emitter> {
    return this.emittersService.findByEmitterId(emitterId);
  }

  @Post()
  public async addEmitter(
    @Body() createEngineerDto: CreateEmitterDto
  ): Promise<Emitter> {
    return this.emittersService.create(createEngineerDto);
  }

  @Put('/:emitterId')
  public async updateEmitter(
    @Param('emitterId') emitterId: string,
    @Body() updateEngineerDto: UpdateEmitterDto
  ): Promise<Emitter> {
    return this.emittersService.update(emitterId, updateEngineerDto);
  }

  @Delete('/:emitterId')
  public async deleteEmitter(@Param('id') emitterId: string): Promise<unknown> {
    return this.emittersService.removeByEmitterId(emitterId);
  }
}
