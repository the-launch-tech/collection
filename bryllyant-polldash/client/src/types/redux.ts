import { AnyAction, ActionCreator, Action as A } from 'redux'
import { ThunkDispatch as TDispatch, ThunkAction } from 'redux-thunk'
import { AxiosStatic } from 'axios'

import { Model, User, Group, Question, Poll, Response, Distribution } from './data'
import { ModalOptions } from './utils'

export type StateKeys =
  | 'Auth'
  | 'Poll'
  | 'Aux'
  | 'Group'
  | 'Distribution'
  | 'Question'
  | 'Response'
  | 'User'

export type ResponseState = {
  receivedResponses: Model<Response>[]
  authResponses: Model<Response>[]
  activeResponse: Model<Response> | null
  userResponses: Model<Response>[]
}

export type DistributionState = {
  distributions: Model<Distribution>[]
}

export type QuestionState = {
  questions: Model<Question>[]
}

export type GroupState = {
  groups: Model<Group>[]
}

export type UserState = {
  users: Model<User>[]
}

export type AuthState = {
  auth: Model<User> | null
  isAuthenticated: boolean
}

export type PollState = {
  polls: Model<Poll>[]
}

export type AuxState = {
  loading: boolean
  modal: ModalOptions
}

export type State = {
  Auth: AuthState
  User: UserState
  Group: GroupState
  Poll: PollState
  Question: QuestionState
  Distribution: DistributionState
  Response: ResponseState
  Aux: AuxState
}

export type Payload<D> = D

export type Types = {
  [type: string]: string
}

export type ActionTypes = {
  [key in StateKeys]: Types
}

export interface Action extends AnyAction {
  type: string
  payload: any
}

export type WrappedThunkDispatch<E> = TDispatch<State, E, Action>

export type WrappedThunkActionCreator<R> = ActionCreator<
  ThunkAction<Promise<R>, State, AxiosStatic, Action>
>
