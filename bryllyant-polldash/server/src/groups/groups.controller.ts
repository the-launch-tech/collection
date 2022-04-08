import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { Request } from 'express'

import { ValidationPipe } from '../common/pipes/validation.pipe'
import { ParseIntArrayPipe } from '../common/pipes/intArray.pipe'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { GroupsService } from './groups.service'
import { Group } from '../common/entities/group.entity'
import { User } from '../common/entities/user.entity'

import { CreateGroupDto, UpdateGroupDto } from './group.dto'
import { GroupPartial, AuthRequest } from '../types'

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles('admin')
  @Get()
  async find(
    @Query('ids') ids: Group['id'][],
    @Query('creatorId') creatorId: User['id']
  ): Promise<Group[]> {
    return await this.groupsService.find(ids, creatorId)
  }

  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: Group['id']): Promise<Group> {
    return await this.groupsService.findOne(id)
  }

  @Roles('admin')
  @Post()
  async create(@Body() { creatorId, name, userIds }: CreateGroupDto): Promise<Group> {
    console.log('{ creatorId, name, userIds }', { creatorId, name, userIds })
    return await this.groupsService.create(creatorId, name, userIds)
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: Group['id'],
    @Body(new ValidationPipe()) group: UpdateGroupDto
  ): Promise<Group> {
    return await this.groupsService.update(id, group)
  }

  @Roles('admin')
  @Put(':id/users/merge')
  async mergeUsers(
    @Param('id', ParseIntPipe) id: Group['id'],
    @Body('userIds', ParseIntArrayPipe) userIds: User['id'][] | User['id']
  ): Promise<Group> {
    if (Array.isArray(userIds)) {
      return await this.groupsService.mergeUsers(id, userIds)
    } else {
      return await this.groupsService.mergeUser(id, userIds)
    }
  }

  @Roles('admin')
  @Put(':id/users/unmerge')
  async unmergeUsers(
    @Param('id', ParseIntPipe) id: Group['id'],
    @Body('userIds', ParseIntArrayPipe) userIds: User['id'][] | User['id']
  ): Promise<Group> {
    if (Array.isArray(userIds)) {
      return await this.groupsService.unmergeUsers(id, userIds)
    } else {
      return await this.groupsService.unmergeUser(id, userIds)
    }
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: Group['id']): Promise<boolean> {
    return await this.groupsService.remove(id)
  }
}
