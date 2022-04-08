import { PollTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action, Model, Poll } from '../../types'

const { log, error } = console

export default (state: State['Poll'] = initialState.Poll, action: Action) => {
  switch (action.type) {
    case PollTypes.CREATE:
      return create(state, action.payload)
    case PollTypes.STORE:
      return store(state, action.payload)
    case PollTypes.REMOVE:
      return remove(state, action.payload)
    case PollTypes.UPDATE:
      return update(state, action.payload)
    default:
      return state
  }
}

const create = (state: State['Poll'], payload: Action['payload']): State['Poll'] => {
  return merge<State['Poll']>(state, { polls: [payload, ...state.polls] })
}

const store = (state: State['Poll'], payload: Action['payload']): State['Poll'] => {
  return merge<State['Poll']>(state, { polls: payload })
}

const remove = (state: State['Poll'], payload: Action['payload']): State['Poll'] => {
  let polls: Model<Poll>[] = Object.assign([], state.polls)
  const index: number = polls.findIndex((poll: Model<Poll>) => poll.id === payload)
  if (index > -1) {
    polls.splice(index, 1)
  }
  return merge<State['Poll']>(state, { polls })
}

const update = (state: State['Poll'], payload: Action['payload']): State['Poll'] => {
  let polls: Model<Poll>[] = Object.assign([], state.polls)
  const index: number = polls.findIndex((poll: Model<Poll>) => poll.id === payload.id)
  if (index > -1) {
    polls[index] = payload
  }
  return merge<State['Poll']>(state, { polls })
}
