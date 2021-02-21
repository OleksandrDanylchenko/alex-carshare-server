import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './config/app/config.service';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const appConfig: AppConfigService = app.get('AppConfigService');
  await app.listen(appConfig.port);
}
bootstrap().catch((err) => console.error(err));
