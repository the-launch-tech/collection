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

import { Group } from './group.entity'
import { Poll } from './poll.entity'
import { Question } from './question.entity'
import { Distribution } from './distribution.entity'
import { Response } from './response.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100, nullable: false })
  firstName: string

  @Column('varchar', { length: 100, nullable: false })
  lastName: string

  @Column('varchar', { unique: true, length: 144, nullable: false })
  email: string

  @Column('varchar', { length: 40 })
  mobile: string

  @Column('enum', { default: 'user', enum: ['user', 'admin'], nullable: false })
  role: 'user' | 'admin'

  @Column('varchar', { nullable: false })
  password: string

  @ManyToMany(
    type => Group,
    group => group.users,
    { cascade: ['insert', 'update'] }
  )
  @JoinTable()
  groups?: Group[]

  @OneToMany(
    type => Group,
    group => group.creator,
    { cascade: ['insert', 'update'] }
  )
  createdGroups?: Group[]

  @OneToMany(
    type => Poll,
    poll => poll.author,
    { cascade: ['insert', 'update'] }
  )
  authoredPolls?: Poll[]

  @OneToMany(
    type => Question,
    question => question.author,
    { cascade: ['insert', 'update'] }
  )
  authoredQuestions?: Question[]

  @ManyToMany(
    type => Distribution,
    distribution => distribution.recipientUsers,
    { cascade: ['insert', 'update'] }
  )
  receivedDistributions?: Distribution[]

  @OneToMany(
    type => Distribution,
    distribution => distribution.admin,
    { cascade: ['insert', 'update'] }
  )
  executedDistributions?: Distribution[]

  @OneToMany(
    type => Response,
    response => response.user,
    { cascade: true }
  )
  responses?: Response[]

  @ManyToOne(
    type => User,
    user => user.users
  )
  admin?: User

  @OneToMany(
    type => User,
    user => user.admin
  )
  users?: User[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
