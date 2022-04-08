import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'

import { Question } from '../common/entities/question.entity'
import { Poll } from '../common/entities/poll.entity'
import { User } from '../common/entities/user.entity'

import { CreateQuestionDto } from './question.dto'

@Injectable()
export class QuestionsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Poll) private pollsRepository: Repository<Poll>
  ) {}

  async create(
    text: CreateQuestionDto['text'],
    authorId: CreateQuestionDto['authorId'],
    pollId: CreateQuestionDto['pollId']
  ): Promise<Question> {
    const author = await this.usersRepository.findOne(authorId)
    const poll = await this.pollsRepository.findOne(pollId)
    return await this.createWithPoll(text, author, poll)
  }

  async createWithPoll(
    text: CreateQuestionDto['text'],
    author: User,
    poll: Poll
  ): Promise<Question> {
    const createdQuestion = this.questionsRepository.create({ text })
    createdQuestion.author = author
    createdQuestion.polls = [poll]
    return await this.questionsRepository.save(createdQuestion)
  }

  async find(ids?: Question['id'][]): Promise<Question[]> {
    const options = { relations: ['polls', 'author'] }
    if (ids && Array.isArray(ids)) {
      options['where'] = { id: In(ids) }
    }
    return await this.questionsRepository.find(options)
  }

  async findOne(id: Question['id']): Promise<Question> {
    return await this.questionsRepository.findOne(id, { relations: ['polls', 'author'] })
  }

  async update(id: Question['id'], text: CreateQuestionDto['text']): Promise<Question> {
    const questionModel = await this.questionsRepository.findOne(id)
    if (!!text && questionModel.text !== text) {
      questionModel.text = text
    }
    const newQuestionModel = await this.questionsRepository.save(questionModel)
    return newQuestionModel
  }

  async remove(id: Question['id']): Promise<boolean> {
    return
  }
}
