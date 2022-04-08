import { PollTypes } from '../types'

import { Action, Data, Poll } from '../../types'

export function create(poll: Data<Poll>): Action {
  return {
    type: PollTypes.CREATE,
    payload: poll,
  }
}

export function storePolls(polls: Data<Poll>[]): Action {
  return {
    type: PollTypes.STORE,
    payload: polls,
  }
}

export function removePoll(id: number | null): Action {
  return {
    type: PollTypes.REMOVE,
    payload: id,
  }
}

export function updatePoll(poll: Data<Poll>): Action {
  return {
    type: PollTypes.UPDATE,
    payload: poll,
  }
}
