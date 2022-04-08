import { combineReducers } from 'redux'

import Auth from './Auth'
import User from './User'
import Poll from './Poll'
import Aux from './Aux'
import Group from './Group'
import Distribution from './Distribution'
import Question from './Question'
import Response from './Response'

import { State } from '../../types'

export default combineReducers<State>({
  Auth,
  User,
  Poll,
  Aux,
  Group,
  Distribution,
  Question,
  Response,
})
