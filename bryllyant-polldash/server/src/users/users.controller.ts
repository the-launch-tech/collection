import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { Request } from 'express'

import { ValidationPipe } from '../common/pipes/validation.pipe'
import { ParseIntArrayPipe } from '../common/pipes/intArray.pipe'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { UsersService } from './users.service'
import { GroupsService } from '../groups/groups.service'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { User } from '../common/entities/user.entity'
import { Group } from '../common/entities/group.entity'

import { CreateUserDto, UpdateUserDto } from './user.dto'
import { AuthRequest } from '../types'

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async find(
    @Query('ids') ids: User['id'][],
    @Query('adminId') adminId: User['id']
  ): Promise<User[]> {
    return await this.usersService.find(ids, adminId)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findOne(@Param('id', ParseIntPipe) id: User['id']): Promise<User> {
    return await this.usersService.findOne({ id })
  }

  @Post()
  async register(@Body(new ValidationPipe()) user: CreateUserDto): Promise<User> {
    return await this.usersService.register(user)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('user', 'admin')
  async update(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body(new ValidationPipe()) user: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.update(id, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: User['id']): Promise<boolean> {
    return await this.usersService.remove(id)
  }
}
