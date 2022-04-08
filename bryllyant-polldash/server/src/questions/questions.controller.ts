import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { Request } from 'express'

import { ValidationPipe } from '../common/pipes/validation.pipe'
import { ParseIntArrayPipe } from '../common/pipes/intArray.pipe'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { QuestionsService } from './questions.service'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { Question } from '../common/entities/question.entity'

import { CreateQuestionDto } from './question.dto'
import { AuthRequest } from '../types'

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body(new ValidationPipe()) { authorId, text, pollId }: CreateQuestionDto
  ): Promise<Question> {
    return await this.questionsService.create(text, authorId, pollId)
  }

  @Get()
  @Roles('admin')
  async find(@Body() body: { ids?: Question['id'][] }): Promise<Question[]> {
    return await this.questionsService.find(body.ids)
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id', ParseIntPipe) id: Question['id']): Promise<Question> {
    return await this.questionsService.findOne(id)
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id', ParseIntPipe) id: Question['id'],
    @Body('text') text: CreateQuestionDto['text']
  ): Promise<Question> {
    return await this.questionsService.update(id, text)
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: Question['id']): Promise<boolean> {
    return await this.questionsService.remove(id)
  }
}
