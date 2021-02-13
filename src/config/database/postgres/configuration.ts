import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  name: process.env.TYPEORM_CONNECTION_NAME,
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  migrations: process.env.TYPEORM_MIGRATIONS,
  migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  entities: process.env.TYPEORM_ENTITIES,
  entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  subscribers: process.env.TYPEORM_SUBSCRIBERS,
  subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR
}));
