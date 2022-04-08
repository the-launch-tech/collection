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

export type Values = FormikValues & {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  passwordConfirmation: string
  role: 'user' | 'admin'
}

export type Props = ReturnType<typeof Maps.state.Register> &
  ReturnType<typeof Maps.dispatch.Register> &
  RouteComponentProps

export const initialValues: Values = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  passwordConfirmation: '',
  role: 'user',
}

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Register, Maps.dispatch.Register)(Component)
}

export const formConfig = {
  title: 'Register User',
  isMultiPage: false,
  fields: [
    [
      {
        width: 50,
        withCell: true,
        type: 'text',
        name: 'firstName',
        placeholder: 'Your first name...',
        required: true,
        label: 'First Name',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.firstName || !!errors.firstName} icon="fal fa-user" />
        ),
      },
      {
        width: 50,
        withCell: true,
        type: 'text',
        name: 'lastName',
        placeholder: 'Your last name...',
        required: true,
        label: 'Last Name',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.lastName || !!errors.lastName} icon="fal fa-user" />
        ),
      },
    ],
    [
      {
        width: 50,
        withCell: true,
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email...',
        required: true,
        label: 'Email',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.email || !!errors.email} icon="fal fa-envelope" />
        ),
      },
      {
        width: 50,
        withCell: true,
        type: 'tel',
        name: 'mobile',
        placeholder: 'Enter your phone...',
        required: true,
        label: 'Phone',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.mobile || !!errors.mobile} icon="fal fa-phone" />
        ),
      },
    ],
    [
      {
        width: 50,
        withCell: true,
        type: 'password',
        name: 'password',
        placeholder: 'Enter a password...',
        required: true,
        label: 'Password',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix errored={!values.password || !!errors.password} icon="fal fa-eye" />
        ),
      },
      {
        width: 50,
        withCell: true,
        type: 'password',
        name: 'passwordConfirmation',
        placeholder: 'Re-enter password...',
        required: true,
        label: 'Password Confirmation',
        inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
          <InputPrefix
            errored={!values.passwordConfirmation || !!errors.passwordConfirmation}
            icon="fal fa-eye"
          />
        ),
      },
    ],
  ],
  actions: {
    hasCancel: false,
    withCell: true,
    submitIcon: 'fal fa-envelope',
    submitLabel: 'Register',
  },
  message: {
    withCell: true,
  },
}
