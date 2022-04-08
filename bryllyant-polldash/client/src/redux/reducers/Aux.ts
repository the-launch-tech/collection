import { AuxTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'

import { State, Action } from '../../types'

export default (state: State['Aux'] = initialState.Aux, action: Action) => {
  switch (action.type) {
    case AuxTypes.LOADING:
      return loading(state, action.payload)
    case AuxTypes.MODAL:
      return modal(state, action.payload)
    default:
      return state
  }
}

const loading = (state: State['Aux'], payload: Action['payload']): State['Aux'] => {
  return merge<State['Aux']>(state, { loading: payload })
}

const modal = (state: State['Aux'], payload: Action['payload']): State['Aux'] => {
  return merge<State['Aux']>(state, { modal: payload })
}
