import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PollsController } from './polls.controller'
import { PollsService } from './polls.service'
import { Poll } from '../common/entities/poll.entity'
import { QuestionsModule } from '../questions/questions.module'
import { UsersModule } from '../users/users.module'
import { DistributionsModule } from '../distributions/distributions.module'
import { ResponsesModule } from '../responses/responses.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Poll]),
    forwardRef(() => QuestionsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => DistributionsModule),
    forwardRef(() => ResponsesModule),
  ],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService, TypeOrmModule],
})
export class PollsModule {}
