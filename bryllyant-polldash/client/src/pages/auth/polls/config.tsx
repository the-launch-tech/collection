import * as React from 'react'
import { connect, ConnectedComponent } from 'react-redux'
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

import Maps from '../../../redux/maps'
import validations from '../../../utils/validations'
import { InputPrefix } from '../../../components/shared/InputPrefix'

export type Values = FormikValues & {
  title: string
  questions: { text: string }[]
}

export const initialValues: Values = {
  title: '',
  questions: [{ text: '' }],
}

export function handleExport<P>(Component: React.FC<P | any>): any {
  return connect(Maps.state.Polls, Maps.dispatch.Polls)(Component)
}

export const formConfig = {
  title: 'Create Poll',
  isMultiPage: false,
  fields: [
    [
      {
        width: 100,
        withCell: true,
        type: 'text',
        name: 'title',
        placeholder: 'Enter poll title....',
        required: true,
        label: 'Title',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.title || !!errors.title} icon="fal fa-note" />
        ),
      },
    ],
    [
      {
        width: 100,
        withCell: true,
        type: 'repeat',
        name: 'questions',
        required: true,
        label: 'Questions',
        fields: [
          {
            width: 100,
            withCell: true,
            type: 'text',
            name: 'text',
            required: true,
            label: 'Question Text',
            inputPrefix: (
              values: FormikValues,
              errors: FormikErrors<FormikValues>,
              name: string
            ): JSX.Element => {
              let i: number = -1
              const nameArr: string[] = name.split('.')
              if (!!nameArr[1]) {
                i = parseInt(nameArr[1])
              }
              return (
                <InputPrefix
                  errored={!values.questions[i].text || !!errors[`questions.${i}.text`]}
                  icon="fal fa-question"
                />
              )
            },
          },
        ],
      },
    ],
  ],
  actions: {
    hasCancel: false,
    withCell: true,
    submitIcon: 'fal fa-user',
    submitLabel: 'Create Poll',
  },
  message: {
    withCell: true,
  },
}
