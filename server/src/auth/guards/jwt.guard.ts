import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_FOR_ADMIN_KEY } from '../decorators/for-admin.decorator';
import { IS_FOR_USER_KEY } from '../decorators/for-user.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isForUser = this.reflector.getAllAndOverride<boolean>(IS_FOR_USER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isForAdmin = this.reflector.getAllAndOverride<boolean>(IS_FOR_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let jwtResult: boolean;
    try {
      const process = super.canActivate(context);
      if (typeof process === 'boolean') {
        jwtResult = process;
      } else if (process instanceof Promise) {
        jwtResult = await process;
      } else {
        jwtResult = await new Promise<boolean>((resolve) => {
          process.subscribe((value) => resolve(value));
        });
      }
    } catch {
      jwtResult = false;
    }

    const user = request.user!;

    if ((isForUser || isForAdmin) && !jwtResult) {
      throw new UnauthorizedException();
    }

    if (isForAdmin && !user.isAdmin) {
      return false;
    }

    return true;
  }
}
