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

import validations from '../../utils/validations'
import Maps from '../../redux/maps'
import { InputPrefix } from '../../components/shared/InputPrefix'

export type Values = FormikValues & {
  email: string
  password: string
}

export type Props = ReturnType<typeof Maps.state.Login> &
  ReturnType<typeof Maps.dispatch.Login> &
  RouteComponentProps

export const initialValues = { email: '', password: '' }

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Login, Maps.dispatch.Login)(Component)
}

export const formConfig = {
  title: 'PollDash Login',
  isMultiPage: false,
  fields: [
    [
      {
        width: 100,
        withCell: true,
        type: 'text',
        name: 'email',
        placeholder: 'Enter your email...',
        required: true,
        label: 'Email',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.email || !!errors.email} icon="fal fa-envelope" />
        ),
      },
      {
        width: 100,
        withCell: true,
        type: 'password',
        name: 'password',
        placeholder: 'Enter a password...',
        required: true,
        label: 'Password',
        showHide: true,
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.password || !!errors.password} icon="fal fa-eye" />
        ),
      },
    ],
  ],
  actions: {
    hasCancel: false,
    withCell: true,
    submitIcon: 'fal fa-check',
    submitLabel: 'Login',
  },
  message: {
    withCell: true,
  },
}
