import { GroupTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action, Model, Group } from '../../types'

const { log, error } = console

export default (state: State['Group'] = initialState.Group, action: Action) => {
  switch (action.type) {
    case GroupTypes.CREATE:
      return create(state, action.payload)
    case GroupTypes.STORE:
      return store(state, action.payload)
    case GroupTypes.REMOVE:
      return remove(state, action.payload)
    case GroupTypes.UPDATE:
      return update(state, action.payload)
    default:
      return state
  }
}

const create = (state: State['Group'], payload: Action['payload']): State['Group'] => {
  return merge<State['Group']>(state, { groups: [payload, ...state.groups] })
}

const store = (state: State['Group'], payload: Action['payload']): State['Group'] => {
  return merge<State['Group']>(state, { groups: payload })
}

const remove = (state: State['Group'], payload: Action['payload']): State['Group'] => {
  let groups: Model<Group>[] = Object.assign([], state.groups)
  const index: number = groups.findIndex((group: Model<Group>) => group.id === payload)
  if (index > -1) {
    groups.splice(index, 1)
  }
  return merge<State['Group']>(state, { groups })
}

const update = (state: State['Group'], payload: Action['payload']): State['Group'] => {
  let groups: Model<Group>[] = Object.assign([], state.groups)
  const index: number = groups.findIndex((group: Model<Group>) => group.id === payload.id)
  if (index > -1) {
    groups[index] = payload
  }
  return merge<State['Group']>(state, { groups })
}
