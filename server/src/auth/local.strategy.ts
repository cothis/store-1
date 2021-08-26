import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'loginId' });
    // 기본적으로 username, password 속성을 예상하지만, 옵션 객체 전달함으로써 변경할수 있음
    // http://www.passportjs.org/docs/downloads/html/
    // Username & Password 탭, Parameters 확인
  }

  async validate(loginId: string, password: string): Promise<Express.User> {
    const user = await this.authService.validateUser(loginId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id };
  }
}
