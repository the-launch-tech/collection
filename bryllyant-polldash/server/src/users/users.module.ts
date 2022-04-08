import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { GroupsModule } from '../groups/groups.module'
import { PollsModule } from '../polls/polls.module'
import { User } from '../common/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => GroupsModule),
    forwardRef(() => PollsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
