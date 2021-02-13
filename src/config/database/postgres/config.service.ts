import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  getEnvArray,
  getPaths,
  getRuntimePaths
} from '../../../common/utils/env-parser.helper';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('postgres.name');
  }

  get type(): string {
    return this.configService.get<string>('postgres.type');
  }

  get host(): string {
    return this.configService.get<string>('postgres.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('postgres.port'));
  }

  get username(): string {
    return this.configService.get<string>('postgres.username');
  }

  get password(): string {
    return this.configService.get<string>('postgres.password');
  }

  get database(): string {
    return this.configService.get<string>('postgres.database');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('postgres.logging');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('postgres.synchronize');
  }

  get migrationsRun(): boolean {
    return this.configService.get<boolean>('postgres.migrationsRun');
  }

  get migrations(): string[] {
    const migrations = this.configService.get<string>('postgres.migrations');
    const migrationsPaths = getPaths(getEnvArray(migrations));
    return getRuntimePaths(migrationsPaths);
  }

  get migrationsDir(): string[] {
    const migrationsDirs = this.configService.get<string>(
      'postgres.migrationsDir'
    );
    const migrationsDirsPaths = getPaths(getEnvArray(migrationsDirs));
    return getRuntimePaths(migrationsDirsPaths);
  }

  get entities(): string[] {
    const entities = this.configService.get<string>('postgres.entities');
    const entitiesPaths = getPaths(getEnvArray(entities));
    return getRuntimePaths(entitiesPaths);
  }

  get entitiesDir(): string[] {
    const entitiesDir = this.configService.get<string>('postgres.entitiesDir');
    const entitiesDirPaths = getPaths(getEnvArray(entitiesDir));
    return getRuntimePaths(entitiesDirPaths);
  }

  get subscribers(): string[] {
    const subscribers = this.configService.get<string>('postgres.subscribers');
    const subscribersPaths = getPaths(getEnvArray(subscribers));
    return getRuntimePaths(subscribersPaths);
  }

  get subscribersDir(): string[] {
    const subscribersDir = this.configService.get<string>(
      'postgres.subscribersDir'
    );
    const subscribersDirPaths = getPaths(getEnvArray(subscribersDir));
    return getRuntimePaths(subscribersDirPaths);
  }
}
