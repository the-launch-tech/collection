import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'
import { Question } from '../common/entities/question.entity'
import { UsersModule } from '../users/users.module'
import { PollsModule } from '../polls/polls.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => UsersModule),
    forwardRef(() => PollsModule),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService, TypeOrmModule],
})
export class QuestionsModule {}
