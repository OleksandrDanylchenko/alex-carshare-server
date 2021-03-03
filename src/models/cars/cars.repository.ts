import { EntityRepository } from 'typeorm';
import { Car } from './entities/car.entity';
import { ModelRepository } from '../model.repository';
import { allCarGroups, CarEntity } from './serializers/car.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(Car)
export class CarsRepository extends ModelRepository<Car, CarEntity> {
  transform(model: Car): CarEntity {
    const transformOptions = {
      groups: allCarGroups
    };
    return plainToClass(
      CarEntity,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: Car[]): CarEntity[] {
    return models.map((model) => this.transform(model));
  }
}
