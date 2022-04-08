import { DistributionTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action } from '../../types'

const { log, error } = console

export default (state: State['Distribution'] = initialState.Distribution, action: Action) => {
  switch (action.type) {
    case DistributionTypes.CREATE:
      return create(state, action.payload)
    case DistributionTypes.STORE:
      return store(state, action.payload)
    default:
      return state
  }
}

const create = (
  state: State['Distribution'],
  payload: Action['payload']
): State['Distribution'] => {
  return merge<State['Distribution']>(state, { distributions: [payload, ...state.distributions] })
}

const store = (state: State['Distribution'], payload: Action['payload']): State['Distribution'] => {
  return merge<State['Distribution']>(state, { distributions: payload })
}
