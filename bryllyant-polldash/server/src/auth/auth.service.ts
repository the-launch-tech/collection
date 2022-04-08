import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { UsersService } from '../users/users.service'
import { User } from '../common/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: User['email'], pass: string): Promise<User> {
    const user: User = await this.usersService.findOne({ email })
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user
    }
    return null
  }

  async login(user: User): Promise<{ pd_access_token: string }> {
    return {
      pd_access_token: this.jwtService.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        groups: user.groups,
      }),
    }
  }
}
