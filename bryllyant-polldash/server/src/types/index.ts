import { Request } from 'express'

import { User } from '../common/entities/user.entity'

export type AuthRequest = Request & {
  user: User | undefined
}

export type GroupPartial = {
  name?: string
}

export type MessageOptions = {
  to: string
  from: string
  subject: string
  html: string
}

export type EmailOptions = {
  id: number
  subject: string
  body?: string
  pollId: number
  adminId: number
  userIds?: number[]
  groupIds?: number[]
}
