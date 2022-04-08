import { QuestionTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'
import { CLIENT_URL, JWT } from '../../constants'

import { State, Action, Model, Question } from '../../types'

const { log, error } = console

export default (state: State['Question'] = initialState.Question, action: Action) => {
  switch (action.type) {
    case QuestionTypes.CREATE:
      return create(state, action.payload)
    case QuestionTypes.STORE:
      return store(state, action.payload)
    case QuestionTypes.REMOVE:
      return remove(state, action.payload)
    case QuestionTypes.UPDATE:
      return update(state, action.payload)
    default:
      return state
  }
}

const create = (state: State['Question'], payload: Action['payload']): State['Question'] => {
  return merge<State['Question']>(state, { questions: [payload, ...state.questions] })
}

const store = (state: State['Question'], payload: Action['payload']): State['Question'] => {
  return merge<State['Question']>(state, { questions: payload })
}

const remove = (state: State['Question'], payload: Action['payload']): State['Question'] => {
  let questions: Model<Question>[] = Object.assign([], state.questions)
  const index: number = questions.findIndex((question: Model<Question>) => question.id === payload)
  if (index > -1) {
    questions.splice(index, 1)
  }
  return merge<State['Question']>(state, { questions })
}

const update = (state: State['Question'], payload: Action['payload']): State['Question'] => {
  let questions: Model<Question>[] = Object.assign([], state.questions)
  const index: number = questions.findIndex(
    (question: Model<Question>) => question.id === payload.id
  )
  if (index > -1) {
    questions[index] = payload
  }
  return merge<State['Question']>(state, { questions })
}
