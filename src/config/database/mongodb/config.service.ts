import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  getEnvArray,
  getPaths,
  getRuntimePaths
} from '../../../common/utils/env-parser.helper';

@Injectable()
export class MongodbConfigService {
  constructor(private configService: ConfigService) {}

  get connection(): string {
    return this.configService.get<string>('mongodb.connection');
  }

  get connectionString(): string {
    return this.configService.get<string>('mongodb.connectionString');
  }

  get database(): string {
    return this.configService.get<string>('mongodb.database');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('mongodb.logging');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('mongodb.synchronize');
  }

  get migrationsRun(): boolean {
    return this.configService.get<boolean>('mongodb.migrationsRun');
  }

  get migrations(): string[] {
    const migrations = this.configService.get<string>('mongodb.migrations');
    const migrationsPaths = getPaths(getEnvArray(migrations));
    return getRuntimePaths(migrationsPaths);
  }

  get migrationsDir(): string[] {
    const migrationsDirs = this.configService.get<string>(
      'mongodb.migrationsDir'
    );
    const migrationsDirsPaths = getPaths(getEnvArray(migrationsDirs));
    return getRuntimePaths(migrationsDirsPaths);
  }

  get entities(): string[] {
    const entities = this.configService.get<string>('mongodb.entities');
    const entitiesPaths = getPaths(getEnvArray(entities));
    return getRuntimePaths(entitiesPaths);
  }

  get entitiesDir(): string[] {
    const entitiesDir = this.configService.get<string>('mongodb.entitiesDir');
    const entitiesDirPaths = getPaths(getEnvArray(entitiesDir));
    return getRuntimePaths(entitiesDirPaths);
  }
}
