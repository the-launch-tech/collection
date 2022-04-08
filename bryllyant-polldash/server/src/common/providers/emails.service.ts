import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as Sendgrid from '@sendgrid/mail'
import { Repository, Connection, In } from 'typeorm'
import * as jwt from 'jsonwebtoken'

import { ResponsesService } from '../../responses/responses.service'
import { Distribution } from '../entities/distribution.entity'
import { Group } from '../entities/group.entity'
import { User } from '../entities/user.entity'
import { Response } from '../entities/response.entity'
import { uniqueArray } from '../helpers/uniqueArray'

import { MessageOptions, EmailOptions } from '../../types'

@Injectable()
export class EmailsService {
  constructor(
    private connection: Connection,
    private readonly responsesService: ResponsesService,
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  getHtml(body: string | undefined, linkCallback: string): string {
    return body.includes(process.env.LINK_CALLBACK)
      ? body.replace(process.env.LINK_CALLBACK, linkCallback)
      : (body += this.appendedLink(linkCallback))
  }

  appendedLink(linkCallback: string): string {
    return `<p>To take the survey <a href="${linkCallback}" target="_blank">click here</a>!</p>`
  }

  getLinkCallback(
    responseId: Response['id'],
    userId: User['id'],
    distributionId: Distribution['id']
  ): string {
    const token: string = jwt.sign(
      { userId, distributionId, responseId },
      process.env.EMAIL_TOKEN,
      {
        expiresIn: '1 week',
      }
    )
    return `http://localhost:${process.env.CLIENT_PORT}/survey?responseId=${responseId}&userId=${userId}&distributionId=${distributionId}&token=${token}`
  }

  async createMail(
    distributionOptions: EmailOptions,
    provider?: 'SENDGRID' | 'MOCK'
  ): Promise<void> {
    if (provider === 'SENDGRID') {
      Sendgrid.setApiKey(process.env.SENDGRID_API)
    }

    let users!: User[]
    const admin: User = await this.usersRepository.findOne(distributionOptions.adminId)
    if (
      !!distributionOptions.groupIds &&
      Array.isArray(distributionOptions.groupIds) &&
      distributionOptions.groupIds.length
    ) {
      const groups: Group[] = await this.groupsRepository.find({
        where: { id: In(distributionOptions.groupIds) },
        relations: ['users'],
      })
      const usersNested: User[][] = groups.map(group => group.users)
      users = [].concat.apply([], usersNested)
    }
    if (
      !!distributionOptions.userIds &&
      Array.isArray(distributionOptions.userIds) &&
      distributionOptions.userIds.length
    ) {
      users = await this.usersRepository.find({ id: In(distributionOptions.userIds) })
    }

    const to: User['email'][] = uniqueArray(users.map(user => user.email))
    const from: User['email'] = admin.email
    const subject: string = distributionOptions.subject
    for (let i = 0; i < to.length; i++) {
      let target: User['email'] = to[i]
      let user = await this.usersRepository.findOne({ email: target })
      const response = await this.responsesService.create({
        userId: user.id,
        distributionId: distributionOptions.id,
      })
      let linkCallback: string = this.getLinkCallback(response.id, user.id, distributionOptions.id)
      let html: string = this.getHtml(distributionOptions.body, linkCallback)
      try {
        if (provider === 'SENDGRID') {
          await Sendgrid.send({ to: target, from, subject, html })
        }
        response.html = html
        response.mock = linkCallback
        await this.responsesService.addMock(response)
      } catch (error) {
        console.error(error)
        if (error.response) console.error(error.response.body)
        throw error
      }
    }
  }
}
