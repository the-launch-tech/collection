import { GroupTypes } from '../types'

import { Action, Data, Group } from '../../types'

export function create(group: Data<Group>): Action {
  return {
    type: GroupTypes.CREATE,
    payload: group,
  }
}

export function storeGroups(groups: Data<Group>[]): Action {
  return {
    type: GroupTypes.STORE,
    payload: groups,
  }
}

export function removeGroup(id: number | null): Action {
  return {
    type: GroupTypes.REMOVE,
    payload: id,
  }
}

export function updateGroup(group: Data<Group>): Action {
  return {
    type: GroupTypes.UPDATE,
    payload: group,
  }
}
