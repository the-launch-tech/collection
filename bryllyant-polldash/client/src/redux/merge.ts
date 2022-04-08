import { State } from '../types/redux'

export default function<S>(state: S, newState: any): S {
  return Object.assign({}, state, newState)
}
