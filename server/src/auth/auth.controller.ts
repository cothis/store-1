import { Controller, Get, Post, Req, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AppConfigService } from 'src/config/app.service';
import { UserService } from 'src/models/users/user.service';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  private clientUrl: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    appConfigService: AppConfigService,
  ) {
    this.clientUrl = appConfigService.client;
  }

  @Get('kakao/')
  requestAuth(@Res() res: Response) {
    res.redirect(this.authService.getKakoAuthUrl());
  }

  @Get('kakao/redirect')
  async requestRedirect(@Session() session: Record<string, any>, @Req() req: Request, @Res() res: Response) {
    try {
      const { code, state } = req.query as Record<string, string>;
      const { oAuthId, email } = await this.authService.kakaoOAuth(code, state);

      // 가입한 유저라면 jwt 발급하고 메인으로 redirect
      const user = await this.userService.findByOauthId(oAuthId);
      if (user) {
        res.cookie('jwt', this.jwtService.sign({ userId: user.id }));
        res.redirect(this.clientUrl);
      }

      // 가입하지 않은 유저는 session에 oAuthId 담고 약관동의로 redirect
      session.oAuthId = oAuthId;
      res.redirect(`${this.clientUrl}/signup?email=${email}`);
    } catch (err) {
      res.redirect(`${this.clientUrl}/oauth-fail`);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    res.cookie('jwt', this.authService.login(req.user));
    res.json(req.user);
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    req.session.destroy(() => {});
    return { ok: true };
  }
}
