import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('app.name');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }
}
