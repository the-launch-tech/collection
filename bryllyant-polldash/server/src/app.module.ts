import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GroupsModule } from './groups/groups.module'
import { PollsModule } from './polls/polls.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { DistributionsModule } from './distributions/distributions.module'
import { QuestionsModule } from './questions/questions.module'
import { ResponsesModule } from './responses/responses.module'
import { configService } from './common/providers/config.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GroupsModule,
    UsersModule,
    PollsModule,
    AuthModule,
    DistributionsModule,
    QuestionsModule,
    ResponsesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
