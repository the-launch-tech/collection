import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Body,
  Param,
  Query,
} from '@nestjs/common'
import { Request } from 'express'

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { ResponsesService } from './responses.service'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { Response } from '../common/entities/response.entity'
import { User } from '../common/entities/user.entity'

import { CreateResponseDto, UpdateResponseDto } from './response.dto'
import { AuthRequest } from '../types'

@UseGuards(RolesGuard)
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async create(@Body() response: CreateResponseDto): Promise<Response> {
    return this.responsesService.create(response)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async find(
    @Query('adminId') adminId?: User['id'],
    @Query('userId') userId?: User['id']
  ): Promise<Response[]> {
    return this.responsesService.find(adminId, userId)
  }

  @Get(':id')
  async findOne(@Param() id: Response['id']): Promise<Response> {
    return this.responsesService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param() id: Response['id'],
    @Body() responseInstance: UpdateResponseDto
  ): Promise<Response> {
    return this.responsesService.update(id, responseInstance)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('user', 'admin')
  async remove(@Param() id: Response['id']): Promise<boolean> {
    return this.responsesService.remove(id)
  }
}
