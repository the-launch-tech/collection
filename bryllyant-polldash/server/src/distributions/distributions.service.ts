import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'

import { Distribution } from '../common/entities/distribution.entity'
import { Group } from '../common/entities/group.entity'
import { User } from '../common/entities/user.entity'
import { Poll } from '../common/entities/poll.entity'

import { CreateDistributionDto } from './distribution.dto'

@Injectable()
export class DistributionsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Distribution) private distributionsRepository: Repository<Distribution>,
    @InjectRepository(Poll) private pollsRepository: Repository<Poll>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(distributionOptions: CreateDistributionDto): Promise<Distribution> {
    const distribution = this.distributionsRepository.create({
      subject: distributionOptions.subject,
      body: distributionOptions.body,
    })
    distribution.poll = await this.pollsRepository.findOne(distributionOptions.pollId)
    distribution.admin = await this.usersRepository.findOne(distributionOptions.adminId)
    return await this.distributionsRepository.save(distribution)
  }

  async find(adminId?: User['id']): Promise<Distribution[]> {
    const options = {
      relations: ['admin', 'poll', 'responses'],
      where: {},
    }
    if (adminId) {
      options.where['admin'] = adminId
    }
    const distributions = await this.distributionsRepository.find(options)
    return await Promise.all(
      distributions.map(async distribution => {
        const poll = await this.pollsRepository.findOne(distribution.poll.id, {
          relations: ['questions'],
        })
        return {
          ...distribution,
          questions: poll.questions,
        }
      })
    )
  }

  async findOne(id: Distribution['id']): Promise<Distribution> {
    return await this.distributionsRepository.findOne(id, {
      relations: ['admin', 'poll', 'recipientUsers', 'recipientGroups'],
    })
  }

  async remove(id: Distribution['id']): Promise<boolean> {
    const distribution = await this.distributionsRepository.findOne(id)
    const removed = await this.distributionsRepository.remove(distribution)
    return !!removed
  }
}
