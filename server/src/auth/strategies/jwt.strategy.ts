import { User } from '@models/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { JwtConfigService } from 'src/config/jwt.service';

const cookieExtractor: JwtFromRequestFunction = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.accessSecret,
    });
  }

  async validate(payload: Express.User): Promise<Express.User> {
    return payload;
  }
}
