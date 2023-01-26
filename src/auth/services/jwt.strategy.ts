import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtAccessToken } from 'src/constants';
import { JwtValidatePayload } from 'src/interfaces/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtAccessToken,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { sub: payload.user.sub, email: payload.user.email };
  }
}
