import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { User } from '../common/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    })
    console.log(
      'ExtractJwt.fromAuthHeaderAsBearerToken()',
      ExtractJwt.fromAuthHeaderAsBearerToken()
    )
  }

  async validate(payload: User) {
    return {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      mobile: payload.mobile,
      role: payload.role,
      groups: payload.groups,
    }
  }
}
