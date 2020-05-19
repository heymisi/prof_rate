import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    try {
      const decoded = await jwt.verify(auth, jwtConstants.secret);
      return decoded;
    } catch (err) {
      throw new NotFoundException('Invalid token');
    }
  }
}
