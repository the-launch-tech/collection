import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ResponsesController } from './responses.controller'
import { ResponsesService } from './responses.service'
import { Response } from '../common/entities/response.entity'
import { DistributionsModule } from '../distributions/distributions.module'
import { UsersModule } from '../users/users.module'
import { QuestionsModule } from '../questions/questions.module'
import { PollsModule } from '../polls/polls.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    forwardRef(() => DistributionsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => QuestionsModule),
    forwardRef(() => PollsModule),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService, TypeOrmModule],
})
export class ResponsesModule {}
