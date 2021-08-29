import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AppConfigService } from 'src/config/app.service';
import { UserService } from 'src/models/users/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('api/v1/auth')
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
    res.redirect(this.authService.getKakaoAuthUrl());
  }

  @Get('kakao/redirect')
  async requestRedirect(@Session() session: Record<string, any>, @Req() req: Request, @Res() res: Response) {
    try {
      const { code, state } = req.query as Record<string, string>;
      const { oAuthId, email } = await this.authService.kakaoOAuth(code, state);

      // 가입한 유저라면 jwt 발급하고 메인으로 redirect
      const user = await this.userService.findByOauthId(oAuthId);
      if (user) {
        res.cookie('jwt', this.jwtService.sign({ id: user.id, isAdmin: user.isAdmin }));
        res.redirect(this.clientUrl);
      }

      // 가입하지 않은 유저는 session에 oAuthId 담고 약관동의로 redirect
      session.oAuthId = oAuthId;
      res.redirect(`${this.clientUrl}/signup?email=${email}`);
    } catch (err) {
      res.redirect(`${this.clientUrl}/oauth-fail`);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', this.authService.login(req.user), { httpOnly: true });
  }

  @Get('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    req.session.destroy(() => {});
  }
}
