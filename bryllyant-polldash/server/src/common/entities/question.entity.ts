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
import { Poll } from './poll.entity'

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 5000, nullable: false })
  text: string

  @ManyToMany(
    type => Poll,
    poll => poll.questions,
    { cascade: true }
  )
  polls?: Poll[]

  @ManyToOne(
    type => User,
    user => user.authoredQuestions,
    { cascade: true }
  )
  author: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
