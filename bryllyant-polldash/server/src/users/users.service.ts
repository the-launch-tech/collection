import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, In } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from '../common/entities/user.entity'
import { Group } from '../common/entities/group.entity'
import { uniqueArray } from '../common/helpers/uniqueArray'

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Group) private groupsRepository: Repository<Group>
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    if (user.password && user.password !== user.passwordConfirmation) {
      throw new BadRequestException('Password mismatch!')
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(user.password ? user.password : user.email, salt)
    user.password = hashedPassword
    const createdUser = this.usersRepository.create(user)
    if (user.adminId) {
      const admin = await this.usersRepository.findOne(user.adminId)
      createdUser.admin = admin
    }
    return await this.usersRepository.save(createdUser)
  }

  async findOne(options: { id?: User['id']; email?: User['email'] }): Promise<User> {
    return await this.usersRepository.findOne({
      where: options,
      relations: ['groups'],
    })
  }

  async find(ids?: User['id'][], adminId?: User['id']): Promise<User[]> {
    const options = { relations: ['groups'], where: {}, orWhere: { admin: null } }
    if (ids && Array.isArray(ids)) {
      options.where = { id: In(ids) }
    }
    if (adminId) {
      options.where['admin'] = adminId
    }
    const targets = await this.usersRepository.find(options)
    const noAdmins = await this.usersRepository.find({
      where: { admin: null },
    })
    const unique = uniqueArray([...targets, ...noAdmins], 'id')
    const index = unique.findIndex(admin => admin.id === adminId)
    if (index > -1) {
      unique.splice(index, 1)
    }
    return unique
  }

  async update(id: User['id'], user: UpdateUserDto): Promise<User> {
    const userModel = await this.usersRepository.findOne(id)
    if (!!user.firstName && userModel.firstName !== user.firstName) {
      userModel.firstName = user.firstName
    }
    if (!!user.lastName && userModel.lastName !== user.lastName) {
      userModel.lastName = user.lastName
    }
    if (!!user.email && userModel.email !== user.email) {
      userModel.email = user.email
    }
    if (!!user.mobile && userModel.mobile !== user.mobile) {
      userModel.mobile = user.mobile
    }
    if (!!user.role && userModel.role !== user.role) {
      userModel.role = user.role
    }
    const newUserModel = await this.usersRepository.save(userModel)
    return newUserModel
  }

  async remove(id: User['id']): Promise<boolean> {
    const user = await this.usersRepository.findOne({ id })
    if (!!user) {
      const removed = await this.usersRepository.remove(user)
      return !!removed
    }
    return false
  }
}
