import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'

import { Response } from '../common/entities/response.entity'
import { Distribution } from '../common/entities/distribution.entity'
import { User } from '../common/entities/user.entity'
import { Question } from '../common/entities/question.entity'
import { Poll } from '../common/entities/poll.entity'

import { CreateResponseDto, UpdateResponseDto } from './response.dto'

@Injectable()
export class ResponsesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Response) private responsesRepository: Repository<Response>,
    @InjectRepository(Distribution) private distributionsRepository: Repository<Distribution>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
    @InjectRepository(Poll) private pollsRepository: Repository<Poll>
  ) {}

  async create(response: CreateResponseDto): Promise<Response> {
    const newResponse = this.responsesRepository.create({
      status: 'pristine',
    })
    newResponse.distribution = await this.distributionsRepository.findOne(response.distributionId)
    newResponse.user = await this.usersRepository.findOne(response.userId)
    return await this.responsesRepository.save(newResponse)
  }

  async find(adminId?: User['id'], userId?: User['id']): Promise<any[]> {
    const options = { relations: ['user', 'distribution'] }
    if (userId) {
      options['where'] = { user: userId }
    }
    let responses = await this.responsesRepository.find(options)
    if (adminId) {
      let adminResponses = []
      for (let i = 0; i < responses.length; i++) {
        const distribution = await this.distributionsRepository.findOne(
          responses[i].distribution.id,
          { relations: ['admin'] }
        )
        if (distribution.admin.id === (typeof adminId === 'string' ? parseInt(adminId) : adminId)) {
          adminResponses.push(responses[i])
        }
      }
      responses = adminResponses
    }
    return await Promise.all(
      responses.map(async response => {
        const distribution = await this.distributionsRepository.findOne(response.distribution.id, {
          relations: ['poll', 'admin'],
        })
        const poll = await this.pollsRepository.findOne(distribution.poll.id, {
          relations: ['questions'],
        })
        const responseQuestions = response.responseQuestions
          ? poll.questions
              .map(q => {
                const answer = response.responseQuestions[q.id.toString()]
                if (!!answer) {
                  return { answer, ...q }
                }
              })
              .filter(Boolean)
          : null
        return {
          status: response.status,
          id: response.id,
          distribution: distribution,
          admin: distribution.admin,
          user: response.user,
          poll,
          responseQuestions,
        }
      })
    )
  }

  async findOne(id: Response['id']): Promise<any> {
    const response = await this.responsesRepository.findOne(id, {
      relations: ['user', 'distribution'],
    })
    const distribution = await this.distributionsRepository.findOne(response.distribution.id, {
      relations: ['poll', 'admin'],
    })
    const poll = await this.pollsRepository.findOne(distribution.poll.id, {
      relations: ['questions'],
    })
    const responseQuestions = response.responseQuestions
      ? poll.questions
          .map(q => {
            const answer = response.responseQuestions[q.id.toString()]
            if (!!answer) {
              return { answer, ...q }
            }
          })
          .filter(Boolean)
      : null
    return {
      status: response.status,
      id: response.id,
      distribution: response.distribution,
      admin: distribution.admin,
      user: response.user,
      poll: poll,
      responseQuestions,
    }
  }

  async update(id: Response['id'], responseInstance: UpdateResponseDto): Promise<Response> {
    let response = await this.responsesRepository.findOne(id, {
      relations: ['distribution'],
    })
    for (let i = 0; i < responseInstance.answers.length; i++) {
      if (
        responseInstance.answers[i].answer === 'yes' ||
        responseInstance.answers[i].answer === 'no'
      ) {
        const question = await this.questionsRepository.findOne(
          responseInstance.answers[i].questionId
        )
        response.responseQuestions = {
          ...response.responseQuestions,
          [responseInstance.answers[i].questionId]: responseInstance.answers[i].answer,
        }
        response = await this.responsesRepository.save(response)
      }
    }
    const distribution = await this.distributionsRepository.findOne(response.distribution.id, {
      relations: ['poll'],
    })
    const poll = await this.pollsRepository.findOne(distribution.poll.id, {
      relations: ['questions'],
    })
    const questionsCount = poll.questions.length
    const answersCount = response.responseQuestions
      ? Object.keys(response.responseQuestions).length
      : 0
    response.status = questionsCount > answersCount ? 'viewed' : 'completed'
    const savedResponse = await this.responsesRepository.save(response)
    return await this.findOne(savedResponse.id)
  }

  async addMock(response: Response): Promise<void> {
    await this.responsesRepository.save(response)
  }

  async remove(id: Response['id']): Promise<boolean> {
    const response = await this.responsesRepository.findOne(id)
    const removed = await this.responsesRepository.remove(response)
    return !!removed
  }
}
