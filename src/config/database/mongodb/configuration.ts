import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  databaseName: process.env.MONGO_DB_DATABASE,
  connectionString: process.env.MONGO_DB_CONNECTION_STRING
}));
