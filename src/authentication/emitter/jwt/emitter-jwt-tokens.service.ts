import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { AttendantEngineer } from '../../../models/attendantEngineers/schemas/engineer.schema';

@Injectable()
export class EmitterJwtTokensService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(engineer: AttendantEngineer): Promise<string> {
    const engineerJwtData = {
      id: engineer._id.toHexString(),
      name: engineer.name,
      surname: engineer.surname
    };
    const opts: SignOptions = { subject: engineerJwtData.id };
    return this.jwtService.signAsync(engineerJwtData, opts);
  }
}
