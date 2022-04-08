import { Question, Response, Model, Distribution } from '../types'

export function getCompletionPercentages(
  responses: Model<Response>[]
): {
  pristine: string
  viewed: string
  completed: string
} {
  const total = responses ? responses.length : 0
  let pristine = total
  let viewed = 0
  let completed = 0

  if (responses) {
    responses.forEach(response => {
      if (response.status === 'viewed') {
        pristine--
        viewed++
      } else if (response.status === 'completed') {
        pristine--
        completed++
      }
    })
  }

  return {
    pristine: `${((pristine / total) * 100).toFixed(2)}%`,
    viewed: `${((viewed / total) * 100).toFixed(2)}%`,
    completed: `${((completed / total) * 100).toFixed(2)}%`,
  }
}

export function getAnswerPercentages(
  question: Model<Question>,
  responses: Model<Response>[]
): { blank: string; yes: string; no: string } {
  const total = responses.length

  let blank = total
  let yes = 0
  let no = 0

  responses.forEach(response => {
    if (response.responseQuestions) {
      const has = response.responseQuestions[question.id]
      if (has === 'yes') {
        yes++
        blank--
      } else if (has === 'no') {
        no++
        blank--
      }
    }
  })

  return {
    blank: `${((blank / total) * 100).toFixed(2)}%`,
    yes: `${((yes / total) * 100).toFixed(2)}%`,
    no: `${((no / total) * 100).toFixed(2)}%`,
  }
}
