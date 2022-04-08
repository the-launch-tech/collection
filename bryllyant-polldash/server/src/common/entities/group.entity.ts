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
import { Distribution } from './distribution.entity'

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100, nullable: false })
  name: string

  @ManyToOne(
    type => User,
    user => user.createdGroups,
    { cascade: true }
  )
  creator: User

  @ManyToMany(
    type => User,
    user => user.groups,
    { cascade: ['insert', 'update'] }
  )
  users?: User[]

  @ManyToMany(
    type => Distribution,
    distribution => distribution.recipientGroups,
    { cascade: ['insert', 'update'] }
  )
  receivedDistributions?: Distribution[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
