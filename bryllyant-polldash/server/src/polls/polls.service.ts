import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'

import { Poll } from '../common/entities/poll.entity'
import { User } from '../common/entities/user.entity'
import { Question } from '../common/entities/question.entity'
import { Distribution } from '../common/entities/distribution.entity'
import { Response } from '../common/entities/response.entity'

import { CreatePollDto, UpdatePollDto } from './poll.dto'

@Injectable()
export class PollsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Poll) private pollsRepository: Repository<Poll>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
    @InjectRepository(Distribution) private distributionsRepository: Repository<Distribution>,
    @InjectRepository(Response) private responsesRepository: Repository<Response>
  ) {}

  async create(authorId: CreatePollDto['authorId'], title: CreatePollDto['title']): Promise<Poll> {
    const createdPoll = this.pollsRepository.create({ title })
    createdPoll.author = await this.usersRepository.findOne(authorId)
    const savedPoll = await this.pollsRepository.save(createdPoll)
    return savedPoll
  }

  async save(poll: Poll): Promise<Poll> {
    return await this.pollsRepository.save(poll)
  }

  async find(ids?: Poll['id'][], authorId?: User['id']): Promise<Poll[]> {
    const options = { relations: ['questions', 'author', 'executedDistributions'], where: {} }
    if (ids && Array.isArray(ids)) {
      options.where = { id: In(ids) }
    }
    if (authorId) {
      options.where['author'] = authorId
    }
    return await this.pollsRepository.find(options)
  }

  async findOne(id: Poll['id']): Promise<Poll> {
    return await this.pollsRepository.findOne(id, {
      relations: ['questions', 'author', 'executedDistributions'],
    })
  }

  async update(id: Poll['id'], poll: UpdatePollDto): Promise<Poll> {
    const pollModel = await this.pollsRepository.findOne(id)
    if (!!poll.title && pollModel.title !== poll.title) {
      pollModel.title = poll.title
    }
    const newUserModel = await this.pollsRepository.save(pollModel)
    return newUserModel
  }

  async addQuestion(pollId: Poll['id'], questionId: Question['id']): Promise<Poll> {
    questionId = typeof questionId === 'string' ? parseInt(questionId) : questionId
    const poll = await this.pollsRepository.findOne(pollId, { relations: ['questions'] })
    const question = await this.questionsRepository.findOne(questionId)
    poll.questions = [...(poll.questions || []), question]
    return await this.pollsRepository.save(poll)
  }

  async addQuestions(pollId: Poll['id'], questionIds: Question['id'][]): Promise<Poll> {
    questionIds = Array.isArray(questionIds) ? questionIds : [questionIds]
    const poll = await this.pollsRepository.findOne(pollId, { relations: ['questions'] })
    const questions = await this.questionsRepository.find({ where: { id: In(questionIds) } })
    poll.questions = [...(poll.questions || []), ...questions]
    return await this.pollsRepository.save(poll)
  }

  async removeQuestion(pollId: Poll['id'], questionId: Question['id']): Promise<Poll> {
    questionId = typeof questionId === 'string' ? parseInt(questionId) : questionId
    const poll = await this.pollsRepository.findOne(pollId, { relations: ['questions'] })
    const question = await this.questionsRepository.findOne(questionId)
    const index = poll.questions.findIndex(question => question.id === questionId)
    if (index > -1) {
      poll.questions.splice(index, 1)
    }
    return await this.pollsRepository.save(poll)
  }

  async removeQuestions(pollId: Poll['id'], questionIds: Question['id'][]): Promise<Poll> {
    questionIds = Array.isArray(questionIds) ? questionIds : [questionIds]
    const poll = await this.pollsRepository.findOne(pollId, { relations: ['questions'] })
    const questions = await this.questionsRepository.find({ where: { id: In(questionIds) } })
    questions.forEach(question => {
      let questionId = typeof question.id === 'string' ? parseInt(question.id) : question.id
      const index = poll.questions.findIndex(q => q.id === questionId)
      if (index > -1) {
        poll.questions.splice(index, 1)
      }
    })
    return await this.pollsRepository.save(poll)
  }

  async remove(id: Poll['id']): Promise<boolean> {
    const poll = await this.pollsRepository.findOne(id, { relations: ['executedDistributions'] })
    if (!!poll) {
      const distributions = poll.executedDistributions
      if (!!poll.executedDistributions) {
        for (let i = 0; i < poll.executedDistributions.length; i++) {
          const distribution = await this.distributionsRepository.findOne(
            poll.executedDistributions[i].id,
            { relations: ['responses'] }
          )
          if (!!distribution.responses) {
            for (let x = 0; x < distribution.responses.length; x++) {
              await this.responsesRepository.remove(distribution.responses[i])
            }
          }
          await this.distributionsRepository.remove(poll.executedDistributions[i])
        }
      }
      const removed = await this.pollsRepository.remove(poll)
      return !!removed
    }
    return false
  }
}
