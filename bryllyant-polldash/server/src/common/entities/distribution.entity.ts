import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from './user.entity'
import { Group } from './group.entity'
import { Poll } from './poll.entity'
import { Response } from './response.entity'

@Entity('distributions')
export class Distribution {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 500, nullable: false })
  subject: string

  @Column('varchar', { length: 10000 })
  body?: string

  @ManyToMany(
    type => Group,
    group => group.receivedDistributions,
    { cascade: ['insert', 'update'] }
  )
  @JoinTable()
  recipientGroups?: Group[]

  @ManyToMany(
    type => User,
    user => user.receivedDistributions,
    { cascade: ['insert', 'update'] }
  )
  @JoinTable()
  recipientUsers?: User[]

  @ManyToOne(type => Poll, { cascade: true })
  poll: Poll

  @ManyToOne(
    type => User,
    user => user.executedDistributions,
    { cascade: true }
  )
  admin: User

  @OneToMany(
    type => Response,
    response => response.distribution,
    { cascade: ['insert', 'update'] }
  )
  responses?: Response[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
