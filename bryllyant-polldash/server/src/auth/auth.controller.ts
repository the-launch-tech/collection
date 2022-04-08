import { Controller, Req, Post, Put, Delete, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../common/guards/local-auth.guard'
import { AuthService } from './auth.service'

import { AuthRequest } from '../types'
import { User } from '../common/entities/user.entity'

@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthRequest): Promise<{ pd_access_token: string }> {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Roles('user', 'admin')
  @Get()
  getAuth(@Req() req: AuthRequest): User {
    return req.user
  }
}
