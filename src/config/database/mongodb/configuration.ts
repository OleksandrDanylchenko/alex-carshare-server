import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  connection: process.env.TYPEORM_MONGO_DB_CONNECTION,
  connectionString: process.env.TYPEORM_MONGO_DB_CONNECTION_STRING,
  database: process.env.TYPEORM_MONGO_DB_DATABASE,
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  migrations: process.env.TYPEORM_MIGRATIONS,
  migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  entities: process.env.TYPEORM_ENTITIES,
  entitiesDir: process.env.TYPEORM_ENTITIES_DIR
}));
