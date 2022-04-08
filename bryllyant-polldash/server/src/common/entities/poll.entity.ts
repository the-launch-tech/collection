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
import { Question } from './question.entity'
import { Distribution } from './distribution.entity'

@Entity('polls')
export class Poll {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100, nullable: false })
  title: string

  @ManyToOne(
    type => User,
    user => user.authoredPolls,
    { cascade: true }
  )
  author: User

  @ManyToMany(
    type => Question,
    question => question.polls,
    { cascade: ['insert', 'update'] }
  )
  @JoinTable()
  questions?: Question[]

  @OneToMany(
    type => Distribution,
    distribution => distribution.poll,
    { cascade: ['insert', 'update'] }
  )
  executedDistributions: Distribution[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
