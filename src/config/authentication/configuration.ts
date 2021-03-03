import { registerAs } from '@nestjs/config';

export default registerAs('authentication', () => ({
  registrationSecret: process.env.REGISTRATION_SECRET,
  jwtSecret: process.env.JWT_SECRET
}));
