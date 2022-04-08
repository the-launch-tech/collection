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
  Query,
} from '@nestjs/common'
import { Request } from 'express'

import { ValidationPipe } from '../common/pipes/validation.pipe'
import { ParseIntArrayPipe } from '../common/pipes/intArray.pipe'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { PollsService } from './polls.service'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { Poll } from '../common/entities/poll.entity'
import { Question } from '../common/entities/question.entity'
import { User } from '../common/entities/user.entity'
import { QuestionsService } from '../questions/questions.service'
import { UsersService } from '../users/users.service'

import { CreatePollDto, UpdatePollDto } from './poll.dto'
import { AuthRequest } from '../types'

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('polls')
export class PollsController {
  constructor(
    private readonly pollsService: PollsService,
    private readonly questionsService: QuestionsService
  ) {}

  @Post()
  @Roles('admin')
  async create(
    @Body(new ValidationPipe()) { authorId, title, text }: CreatePollDto
  ): Promise<Poll> {
    const createdPoll = await this.pollsService.create(authorId, title)
    if (!!text && Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        await this.questionsService.createWithPoll(text[i], createdPoll.author, createdPoll)
      }
    } else if (!!text && typeof text === 'string') {
      await this.questionsService.createWithPoll(text, createdPoll.author, createdPoll)
    }
    const poll = await this.pollsService.save(createdPoll)
    return await this.pollsService.findOne(poll.id)
  }

  @Get()
  @Roles('admin')
  async find(
    @Query('ids') ids?: Poll['id'][],
    @Query('authorId') authorId?: User['id']
  ): Promise<Poll[]> {
    return await this.pollsService.find(ids, authorId)
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id', ParseIntPipe) id: Poll['id']): Promise<Poll> {
    return await this.pollsService.findOne(id)
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id', ParseIntPipe) id: Poll['id'],
    @Body(new ValidationPipe()) poll: UpdatePollDto
  ): Promise<Poll> {
    return await this.pollsService.update(id, poll)
  }

  @Put(':id/add/questions')
  @Roles('admin')
  async addQuestions(
    @Param('id', ParseIntPipe) id: Poll['id'],
    @Body('questionId', ParseIntArrayPipe) questionIds: Question['id'][]
  ): Promise<Poll> {
    if (Array.isArray(questionIds)) {
      return await this.pollsService.addQuestions(id, questionIds)
    } else if (typeof questionIds === 'number') {
      return await this.pollsService.addQuestion(id, questionIds)
    }
  }

  @Put(':id/remove/questions')
  @Roles('admin')
  async removeQuestions(
    @Param('id', ParseIntPipe) id: Poll['id'],
    @Body('questionId', ParseIntArrayPipe) questionIds: Question['id'][]
  ): Promise<Poll> {
    if (Array.isArray(questionIds)) {
      return await this.pollsService.removeQuestions(id, questionIds)
    } else if (typeof questionIds === 'number') {
      return await this.pollsService.removeQuestion(id, questionIds)
    }
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: Poll['id']): Promise<boolean> {
    return await this.pollsService.remove(id)
  }
}
