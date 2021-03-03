import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: process.env.PORT || process.env.APP_PORT,
  env: process.env.NODE_ENV
}));
