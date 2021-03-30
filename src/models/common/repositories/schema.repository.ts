import {
  FilterQuery,
  Model,
  QueryFindOneAndRemoveOptions,
  QueryFindOneAndUpdateOptions,
  QueryPopulateOptions,
  UpdateQuery
} from 'mongoose';
import { BaseSchema } from '../schemas/base-schema.schema';
import { PaginationQuery } from '../dtos/pagination-query';

export class SchemaRepository<T extends BaseSchema> {
  constructor(private readonly model: Model<T>) {}

  async findOne(
    modelFilterQuery: FilterQuery<T>,
    modelPopulateOptions: QueryPopulateOptions[] = []
  ): Promise<T> {
    return this.model.findOne(modelFilterQuery).populate(modelPopulateOptions);
  }

  async find(
    modelFilterQuery: FilterQuery<T>,
    paginationQuery: PaginationQuery,
    modelPopulateOptions: QueryPopulateOptions[] = []
  ): Promise<T[]> {
    return this.model
      .find(modelFilterQuery)
      .populate(modelPopulateOptions)
      .skip(paginationQuery?.offset)
      .limit(paginationQuery?.limit);
  }

  async create(newModel: T): Promise<T> {
    const newModelInstance = new this.model(newModel);
    return this.model.create(newModelInstance);
  }

  async findOneAndUpdate(
    modelFilterQuery: FilterQuery<T>,
    updateModel: UpdateQuery<T>,
    updateOptions: QueryFindOneAndUpdateOptions = { new: true }
  ): Promise<T> {
    return this.model.findOneAndUpdate(
      modelFilterQuery,
      updateModel,
      updateOptions
    );
  }

  async findOneAndDelete(
    emitterFilterQuery: FilterQuery<T>,
    updateOptions: QueryFindOneAndRemoveOptions = { projection: {} }
  ): Promise<T> {
    return this.model.findOneAndDelete(emitterFilterQuery, updateOptions);
  }
}
