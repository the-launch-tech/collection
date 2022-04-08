import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DistributionsController } from './distributions.controller'
import { DistributionsService } from './distributions.service'
import { Distribution } from '../common/entities/distribution.entity'
import { EmailsService } from '../common/providers/emails.service'
import { GroupsModule } from '../groups/groups.module'
import { UsersModule } from '../users/users.module'
import { PollsModule } from '../polls/polls.module'
import { ResponsesModule } from '../responses/responses.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Distribution]),
    forwardRef(() => GroupsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PollsModule),
    ResponsesModule,
  ],
  controllers: [DistributionsController],
  providers: [DistributionsService, EmailsService],
  exports: [DistributionsService, TypeOrmModule],
})
export class DistributionsModule {}
