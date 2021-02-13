import { plainToClass } from 'class-transformer';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ModelEntity } from '../common/serializers/model.serializer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async getById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<T | null> {
    return await this.findOne({
      where: { id },
      relations
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(
            new NotFoundException(`Model not found. ID: ${id}`)
          );
        }

        return Promise.resolve(entity);
      })
      .catch((error) => Promise.reject(error));
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<T[] | null> {
    return this.find({ relations })
      .then((entities) => {
        if (!entities && throwsException) {
          return Promise.reject(new NotFoundException('Model not found'));
        }

        return Promise.resolve(entities);
      })
      .catch((error) => Promise.reject(error));
  }

  async getOneWhere(
    where: Record<string, unknown>,
    relations: string[] = [],
    throwsException = false
  ): Promise<T | null> {
    return this.findOne({ where, relations })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found'));
        }

        return Promise.resolve(entity);
      })
      .catch((error) => Promise.reject(error));
  }

  async getWhere(
    where: Record<string, unknown>,
    relations: string[] = [],
    throwsException = false
  ): Promise<T[] | null> {
    return this.find({ where, relations })
      .then((entities) => {
        if (!entities && throwsException) {
          return Promise.reject(new NotFoundException('Model not found'));
        }

        return Promise.resolve(entities);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = []
  ): Promise<T> {
    return this.save(inputs)
      .then(async (entity) => await this.getById((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    id: number,
    inputs: QueryDeepPartialEntity<T>
  ): Promise<T> {
    return this.update(id, inputs)
      .then(async () => await this.getById(id))
      .catch((error) => Promise.reject(error));
  }

  async updateNestedEntity(id: number, inputs: DeepPartial<T>): Promise<T> {
    const nestedEntity = { id, ...inputs } as DeepPartial<T>;
    return this.save(nestedEntity)
      .then(async () => await this.getById(id))
      .catch((error) => Promise.reject(error));
  }

  async deleteEntity(id: number): Promise<DeleteResult> {
    return this.delete(id)
      .then((deletionResult) => Promise.resolve(deletionResult))
      .catch((error) => Promise.reject(error));
  }

  async deleteNestedEntity(entity: T): Promise<T> {
    return this.remove(entity)
      .then((entity) => Promise.resolve(entity))
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
