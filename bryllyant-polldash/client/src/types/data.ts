export type Model<M> = { id: number } & M

export type Distribution = {
  poll: number
  groups?: number[]
  users?: number[]
  responses?: Model<Response>[]
}

export type Response = {
  user: Model<User>
  distribution: Model<Distribution>
  status: 'pristine' | 'viewed' | 'completed'
  poll: Model<Poll>
  responseQuestions: any
  mock?: string
  html?: string
}

export type Question = {
  text: string
  polls: Model<Poll>[]
}

export type Poll = {
  title: string
  questions: Model<Question>[]
}

export type Group = {
  name: string
  creator: User
  users: Model<User>[]
  polls: Model<Poll>[]
}

export type Auth = User

export type User = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  role: string
  groups?: Model<Group>[] | null
  adminGroups?: Model<Group>[] | null
}

export type CreateUser = {
  firstName: string
  lastName: string
  email: string
  mobile?: string
  password?: string
  role: 'user' | 'admin'
  adminId?: number
}

export type UpdateUser = {
  firstName?: string
  lastName?: string
  email?: string
  mobile?: string
  password?: string
  role: 'user' | 'admin'
}

export type RemoveUser = {
  userIds: number[]
}

export type CreatePoll = {
  authorId: number
  title: string
  text: string[]
}

export type UpdatePoll = {
  title: string
}

export type CreateQuestion = {
  authorId: number
  pollId: number
  text: string
}

export type UpdateQuestion = {
  text: string
}

export type CreateGroup = {
  creatorId: number
  name: string
  userIds?: number[]
}

export type UpdateGroup = {
  name: string
}

export type CreateDistribution = {
  subject: string
  body?: string
  adminId: number
  pollId: number
  userIds?: number[]
  groupIds?: number[]
  provider: string
}

export type UpdateResponse = {
  answers: { questionId: number; answer: 'yes' | 'no' | '' }[]
}
