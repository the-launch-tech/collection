import { ResponseTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'

import { State, Action, Model, Response, Data } from '../../types'

const { log, error } = console

export default (state: State['Response'] = initialState.Response, action: Action) => {
  switch (action.type) {
    case ResponseTypes.UPDATE:
      return update(state, action.payload)
    case ResponseTypes.STORE_ACTIVE:
      return storeActive(state, action.payload)
    case ResponseTypes.STORE_AUTH:
      return storeAuth(state, action.payload)
    case ResponseTypes.STORE_USER:
      return storeUser(state, action.payload)
    case ResponseTypes.STORE_RECEIVED:
      return storeReceived(state, action.payload)
    default:
      return state
  }
}

const storeActive = (state: State['Response'], payload: Action['payload']): State['Response'] => {
  return merge<State['Response']>(state, { activeResponse: payload })
}

const storeAuth = (state: State['Response'], payload: Action['payload']): State['Response'] => {
  return merge<State['Response']>(state, { authResponses: payload })
}

const storeUser = (state: State['Response'], payload: Action['payload']): State['Response'] => {
  return merge<State['Response']>(state, { userResponses: payload })
}

const storeReceived = (state: State['Response'], payload: Action['payload']): State['Response'] => {
  return merge<State['Response']>(state, { receivedResponses: payload })
}

const update = (state: State['Response'], payload: Action['payload']): State['Response'] => {
  return merge<State['Response']>(state, { activeResponse: payload })
}
