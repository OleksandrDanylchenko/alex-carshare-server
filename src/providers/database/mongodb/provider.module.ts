import { Module } from '@nestjs/common';
import { MongoDbConfigModule } from '../../../config/database/mongodb/config.module';
import { MongodbConfigService } from '../../../config/database/mongodb/config.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoDbConfigModule],
      useFactory: (mongodbConfigService: MongodbConfigService) => ({
        dbName: mongodbConfigService.databaseName,
        uri: mongodbConfigService.connectionString,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }),
      inject: [MongodbConfigService]
    } as MongooseModuleOptions)
  ]
})
export class MongoDbDatabaseProviderModule {}
