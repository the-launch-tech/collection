import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, getRepository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { User } from '../entities/user.entity'

export class SeedService {
  static async seedAdmin() {
    const connection = getConnection()
    const userRepository = getRepository(User)
    const admin = await userRepository.findOne({ email: 'admin@example.com' })
    if (!admin) {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync('password', salt)
      const user = userRepository.create({
        firstName: 'Admin',
        lastName: 'Master',
        email: 'admin@example.com',
        mobile: '9192591882',
        password: hashedPassword,
        role: 'admin',
      })
      await userRepository.save(user)
    }
  }
}
