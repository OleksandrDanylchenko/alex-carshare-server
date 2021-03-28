import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../../../common/decorators/routes-privacy.decorator';
import { Handshake, Socket } from 'socket.io';

@Injectable()
export class SocketJwtAuthGuard extends AuthGuard('emitterSocketJwtStrategy') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): Handshake {
    return context.switchToWs().getClient<Socket>().handshake;
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
