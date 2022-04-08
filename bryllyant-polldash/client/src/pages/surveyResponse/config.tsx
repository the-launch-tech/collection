import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikValues,
  FormikHelpers,
} from 'formik'

import Maps from '../../redux/maps'
import validations from '../../utils/validations'
import { InputPrefix } from '../../components/shared/InputPrefix'

import { Model, Question, Poll, Response } from '../../types'

export type Values = {
  [key: string]: 'yes' | 'no' | ''
}

export type Props = ReturnType<typeof Maps.state.Survey> &
  ReturnType<typeof Maps.dispatch.Survey> &
  RouteComponentProps

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Survey, Maps.dispatch.Survey)(Component)
}

export const initialValues = (response: Model<Response>): Values => {
  const values: Values = {}
  if (!response.poll.questions) {
    return values
  }
  for (let i: number = 0; i < response.poll.questions.length; i++) {
    let index: number = (response.responseQuestions || []).findIndex(
      (q: any): boolean => q.id === response.poll.questions[i].id
    )
    values[response.poll.questions[i].id.toString()] = response.responseQuestions
      ? response.responseQuestions[index]
        ? response.responseQuestions[index].answer
        : ''
      : ''
  }
  return values
}

export const formConfig = (response: Model<Response>): any => {
  return {
    title: response.poll.title,
    isMultiPage: false,
    fields: [
      (response.poll.questions || []).map((question: Model<Question>, i: number): any => ({
        width: 100,
        withCell: true,
        type: 'radio',
        name: `${question.id}`,
        required: true,
        label: question.text,
        options: ['yes', 'no'],
      })),
    ],
    actions: {
      hasCancel: false,
      withCell: true,
      submitIcon: 'fal fa-paper-plane',
      submitLabel: 'Submit Survey',
    },
    message: {
      withCell: true,
    },
  }
}
