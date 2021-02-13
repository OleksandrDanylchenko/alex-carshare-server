import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get registrationSecret(): string {
    return this.configService.get<string>('authentication.registrationSecret');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('authentication.jwtSecret');
  }
}
