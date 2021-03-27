import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongodbConfigService {
  constructor(private configService: ConfigService) {}

  get databaseName(): string {
    return this.configService.get<string>('mongodb.databaseName');
  }

  get connectionString(): string {
    return this.configService.get<string>('mongodb.connectionString');
  }
}
