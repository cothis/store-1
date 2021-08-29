import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'loginId' });
  }

  async validate(loginId: string, password: string): Promise<Express.User> {
    const user = await this.authService.validateUser(loginId, password);
    if (!user) {
      throw new NotFoundException('일치하는 사용자가 없습니다.');
    }
    return user;
  }
}
