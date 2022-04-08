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
import { Distribution } from './distribution.entity'

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number

  @Column('enum', { enum: ['pristine', 'viewed', 'completed'], nullable: false })
  status: 'pristine' | 'viewed' | 'completed'

  @Column('json', { nullable: true })
  responseQuestions?: object

  @Column('varchar', { nullable: true })
  html?: string

  @Column('varchar', { nullable: true })
  mock?: string

  @ManyToOne(
    type => Distribution,
    distribution => distribution.responses,
    { cascade: true }
  )
  distribution: Distribution

  @ManyToOne(
    type => User,
    user => user.responses,
    { cascade: ['insert', 'update'] }
  )
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
