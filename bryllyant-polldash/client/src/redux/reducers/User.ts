import { UserTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action, Model, User } from '../../types'

const { log, error } = console

export default (state: State['User'] = initialState.User, action: Action) => {
  switch (action.type) {
    case UserTypes.CREATE:
      return create(state, action.payload)
    case UserTypes.STORE:
      return store(state, action.payload)
    case UserTypes.REMOVE:
      return remove(state, action.payload)
    case UserTypes.UPDATE:
      return update(state, action.payload)
    default:
      return state
  }
}

const create = (state: State['User'], payload: Action['payload']): State['User'] => {
  return merge<State['User']>(state, { users: [payload, ...state.users] })
}

const store = (state: State['User'], payload: Action['payload']): State['User'] => {
  return merge<State['User']>(state, { users: payload })
}

const remove = (state: State['User'], payload: Action['payload']): State['User'] => {
  let users: Model<User>[] = Object.assign([], state.users)
  const index: number = users.findIndex((user: Model<User>) => user.id === payload)
  if (index > -1) {
    users.splice(index, 1)
  }
  return merge<State['User']>(state, { users })
}

const update = (state: State['User'], payload: Action['payload']): State['User'] => {
  let users: Model<User>[] = Object.assign([], state.users)
  const index: number = users.findIndex((user: Model<User>) => user.id === payload.id)
  if (index > -1) {
    users[index] = payload
  }
  return merge<State['User']>(state, { users })
}
