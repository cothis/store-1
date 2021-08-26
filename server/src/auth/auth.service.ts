import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import rs from 'randomstring';
import { AppConfigService } from 'src/config/app.service';
import { AuthConfigService } from 'src/config/auth-config.service';
import { User } from 'src/models/users/entities/user.entity';
import { UserService } from 'src/models/users/user.service';

const STATE = rs.generate(20);

const KAKAO_AUTH_URI = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_TOKEN_URI = 'https://kauth.kakao.com/oauth/token';
const KAKAO_API_URI = 'https://kapi.kakao.com/v2/user/me';
const KAKAO_CONTENT_TYPE = 'application/x-www-form-urlencoded';

@Injectable()
export class AuthService {
  private REDIRECT_URI: string;
  private REST_API_KEY: string;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    authConfigService: AuthConfigService,
    appConfigService: AppConfigService,
  ) {
    this.REST_API_KEY = authConfigService.kakaoClientId;
    this.REDIRECT_URI = appConfigService.server + '/api/v1/auth/kakao/redirect';
  }

  getKakoAuthUrl() {
    const querystring = `?client_id=${this.REST_API_KEY}&redirect_uri=${this.REDIRECT_URI}&state=${STATE}&response_type=code`;
    return `${KAKAO_AUTH_URI}${querystring}`;
  }

  async kakaoOAuth(code: string, state: string) {
    if (state !== STATE) throw new BadRequestException('STATE가 다릅니다. csrf 공격이 의심됩니다.');

    const param = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.REST_API_KEY,
      redirect_uri: this.REDIRECT_URI,
      code,
    });

    const result: { data: { access_token: string } } = await axios.post(KAKAO_TOKEN_URI, param, {
      headers: {
        'Content-Type': KAKAO_CONTENT_TYPE,
      },
    });

    return this.getKakaoUserInfo(result.data.access_token);
  }

  async getKakaoUserInfo(accessToken: string) {
    const result: { data: { id: string; kakao_account: { email?: string } } } = await axios.get(KAKAO_API_URI, {
      headers: {
        Accept: `${KAKAO_CONTENT_TYPE};charset=utf-8`,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const oAuthId: string = result.data.id;
    const email: string = result.data.kakao_account.email;
    return { accessToken, oAuthId, email };
  }

  async validateUser(loginId: string, password: string): Promise<Partial<User> | null> {
    const user = await this.userService.findByLoginId(loginId);
    if (user && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  login(user: any) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }
}
