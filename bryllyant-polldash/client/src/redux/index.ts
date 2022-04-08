import { applyMiddleware, createStore, compose, CombinedState, StoreCreator } from 'redux'
import ReduxThunk from 'redux-thunk'
import { AxiosStatic } from 'axios'

import RootReducer from './reducers'

import { State } from '../types'

export default function(state: any, HttpStatic: AxiosStatic) {
  return createStore(RootReducer, state, applyMiddleware(ReduxThunk.withExtraArgument(HttpStatic)))
}
