import { AuthTypes } from '../types'

import { User, Data, Action } from '../../types'

export function mount(auth: Data<User> | null | false): Action {
  return {
    type: AuthTypes.MOUNT,
    payload: auth,
  }
}

export function logout(): Action {
  return {
    type: AuthTypes.LOGOUT,
    payload: null,
  }
}
