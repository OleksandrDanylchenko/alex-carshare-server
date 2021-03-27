import { Injectable } from '@nestjs/common';
import { EngineersService } from '../../models/attendantEngineers/engineers.service';
import { AttendantEngineer } from '../../models/attendantEngineers/schemas/engineer.schema';
import { compareHash } from '../../common/utils/hashing.helper';

@Injectable()
export class EmitterAuthService {
  constructor(private readonly engineersService: EngineersService) {}

  async validateExistingCar(
    login: string,
    password: string
  ): Promise<AttendantEngineer> {
    const engineer = await this.engineersService.findOneWhere({
      activationLogin: login
    });
    if (!engineer) {
      return null;
    }

    const isPasswordMatching = await compareHash(
      password,
      engineer.activationPassword
    );
    if (isPasswordMatching) {
      return engineer;
    }
    return null;
  }
}
