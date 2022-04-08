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
import { DistributionsService } from './distributions.service'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { Distribution } from '../common/entities/distribution.entity'
import { User } from '../common/entities/user.entity'
import { EmailsService } from '../common/providers/emails.service'

import { CreateDistributionDto } from './distribution.dto'
import { AuthRequest, MessageOptions } from '../types'

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('distributions')
export class DistributionsController {
  constructor(
    private readonly distributionsService: DistributionsService,
    private readonly emailsService: EmailsService
  ) {}

  @Post()
  @Roles('admin')
  async create(@Body() distributionOptions: CreateDistributionDto): Promise<Distribution> {
    console.log('distributionOptions', distributionOptions)
    if (!distributionOptions.userIds && !distributionOptions.groupIds) {
      throw 'Must have target for distribution'
    }
    const distribution = await this.distributionsService.create(distributionOptions)
    const mockedDistributions = await this.emailsService.createMail(
      {
        ...distributionOptions,
        id: distribution.id,
      },
      distributionOptions.provider
    )
    return distribution
  }

  @Get()
  @Roles('admin')
  async find(@Query('adminId') adminId?: User['id']): Promise<Distribution[]> {
    return await this.distributionsService.find(adminId)
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param() id: Distribution['id']): Promise<Distribution> {
    return await this.distributionsService.findOne(id)
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param() id: Distribution['id']): Promise<boolean> {
    return await this.distributionsService.remove(id)
  }
}
