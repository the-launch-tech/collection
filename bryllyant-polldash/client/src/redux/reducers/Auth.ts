import { AuthTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action } from '../../types'

const { log, error } = console

export default (state: State['Auth'] = initialState.Auth, action: Action) => {
  switch (action.type) {
    case AuthTypes.MOUNT:
      return mount(state, action.payload)
    case AuthTypes.LOGOUT:
      return logout(state)
    default:
      return state
  }
}

const mount = (state: State['Auth'], payload: Action['payload']): State['Auth'] => {
  if (!payload) {
    return logout(state)
  }
  return merge<State['Auth']>(state, { auth: payload, isAuthenticated: true })
}

const logout = (state: State['Auth']): State['Auth'] => {
  localStorage.removeItem(JWT)
  return merge<State['Auth']>(state, { auth: null, isAuthenticated: false })
}
