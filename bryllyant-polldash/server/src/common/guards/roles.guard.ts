import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { User } from '../entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    console.log('roles', roles)

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user: User = request.user
    console.log('user', user)
    return true
  }
}
