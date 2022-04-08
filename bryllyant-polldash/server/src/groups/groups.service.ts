import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'

import { Group } from '../common/entities/group.entity'
import { User } from '../common/entities/user.entity'
import { uniqueArray } from '../common/helpers/uniqueArray'

import { CreateGroupDto, UpdateGroupDto } from './group.dto'

@Injectable()
export class GroupsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async find(ids?: Group['id'][], creatorId?: User['id']): Promise<Group[]> {
    const options = { relations: ['creator', 'users', 'receivedDistributions'], where: {} }
    if (ids && Array.isArray(ids)) {
      options.where = { id: In(ids) }
    }
    if (creatorId) {
      options.where['creator'] = creatorId
    }
    return await this.groupsRepository.find(options)
  }

  async findOne(id: Group['id']): Promise<Group> {
    return await this.groupsRepository.findOne(id, {
      relations: ['creator', 'users', 'receivedDistributions'],
    })
  }

  async create(
    id: CreateGroupDto['creatorId'],
    name: CreateGroupDto['name'],
    userIds?: CreateGroupDto['userIds']
  ): Promise<Group> {
    const createdGroup = this.groupsRepository.create({ name })
    createdGroup.creator = await this.usersRepository.findOne(id)
    const group = await this.groupsRepository.save(createdGroup)
    if (!!userIds && Array.isArray(userIds)) {
      for (let i = 0; i < userIds.length; i++) {
        await this.addUser(userIds[i], createdGroup)
      }
    }
    return group
  }

  async update(id: Group['id'], group: UpdateGroupDto): Promise<Group> {
    const groupModel = await this.groupsRepository.findOne(id)
    if (!!group.name && group.name !== groupModel.name) {
      groupModel.name = group.name
    }
    return await this.groupsRepository.save(groupModel)
  }

  async remove(id: Group['id']): Promise<boolean> {
    const group = await this.groupsRepository.findOne(id)
    const removed = await this.groupsRepository.remove(group)
    return !!removed
  }

  async mergeUser(groupId: Group['id'], userId: User['id']): Promise<Group> {
    const group: Group = await this.groupsRepository.findOne(groupId, { relations: ['users'] })
    return await this.addUser(userId, group)
  }

  async mergeUsers(groupId: Group['id'], userIds: User['id'][]): Promise<Group> {
    let group: Group = await this.groupsRepository.findOne(groupId, { relations: ['users'] })
    for (let i = 0; i < userIds.length; i++) {
      group = await this.addUser(userIds[i], group)
    }
    return group
  }

  async addUser(id: User['id'], group: Group): Promise<Group> {
    const user: User = await this.usersRepository.findOne({ id })
    if (group && user) {
      group.users = [...(group.users || []), user]
    }
    return await this.groupsRepository.save(group)
  }

  async unmergeUser(groupId: Group['id'], userId: User['id']): Promise<Group> {
    const group: Group = await this.groupsRepository.findOne(groupId, { relations: ['users'] })
    return await this.removeUser(userId, group)
  }

  async unmergeUsers(groupId: Group['id'], userIds: User['id'][]): Promise<Group> {
    let group: Group = await this.groupsRepository.findOne(groupId, { relations: ['users'] })
    for (let i = 0; i < userIds.length; i++) {
      group = await this.removeUser(userIds[i], group)
    }
    return group
  }

  async removeUser(id: User['id'], group: Group): Promise<Group> {
    if (typeof id === 'string') {
      id = parseInt(id)
    }
    const index = group.users.findIndex(user => user.id === id)
    if (index > -1) {
      group.users.splice(index, 1)
    }
    return await this.groupsRepository.save(group)
  }
}
