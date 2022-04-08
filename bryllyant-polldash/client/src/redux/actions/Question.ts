import { QuestionTypes } from '../types'

import { Action, Data, Question } from '../../types'

export function create(question: Data<Question>): Action {
  return {
    type: QuestionTypes.CREATE,
    payload: question,
  }
}

export function storeQuestions(questions: Data<Question>[]): Action {
  return {
    type: QuestionTypes.STORE,
    payload: questions,
  }
}

export function removeQuestion(id: number | null): Action {
  return {
    type: QuestionTypes.REMOVE,
    payload: id,
  }
}

export function updateQuestion(question: Data<Question>): Action {
  return {
    type: QuestionTypes.UPDATE,
    payload: question,
  }
}
