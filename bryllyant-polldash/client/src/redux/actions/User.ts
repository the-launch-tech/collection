import { UserTypes } from '../types'

import { User, Data, Action } from '../../types'

export function create(user: Data<User>): Action {
  return {
    type: UserTypes.CREATE,
    payload: user,
  }
}

export function storeUsers(users: Data<User>[]): Action {
  return {
    type: UserTypes.STORE,
    payload: users,
  }
}

export function removeUser(id: number | null): Action {
  return {
    type: UserTypes.REMOVE,
    payload: id,
  }
}

export function updateUser(user: Data<User>): Action {
  return {
    type: UserTypes.UPDATE,
    payload: user,
  }
}
