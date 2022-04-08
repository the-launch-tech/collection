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
  name: string
  users: number[]
}

export const initialValues: Values = {
  name: '',
  users: [],
}

export function handleExport<P>(Component: React.FC<P | any>): any {
  return connect(Maps.state.Groups, Maps.dispatch.Groups)(Component)
}

export const formConfig = (users: any): any => {
  return {
    title: 'Create Group',
    isMultiPage: false,
    fields: [
      [
        {
          width: 100,
          withCell: true,
          type: 'text',
          name: 'name',
          placeholder: 'Enter group name....',
          required: true,
          label: 'Name',
          inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
            <InputPrefix errored={!values.name || !!errors.name} icon="fal fa-note" />
          ),
        },
      ],
      [
        {
          width: 100,
          withCell: true,
          type: 'checkbox',
          name: 'users',
          required: false,
          label: 'Seed Users',
          options: users.map((user: any): any => ({ label: user.id, value: user.email })),
          inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
            <InputPrefix errored={false} icon="fal fa-user" />
          ),
        },
      ],
    ],
    actions: {
      hasCancel: false,
      withCell: true,
      submitIcon: 'fal fa-users',
      submitLabel: 'Create Group',
    },
    message: {
      withCell: true,
    },
  }
}
