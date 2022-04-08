import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import { Content } from '../../components/shared/Content'
import { Props, Values, initialValues, handleExport, formConfig } from './config'
import validation from '../../utils/validation'
import { FormTemplate } from '../../components/shared/form'

import { Response } from '../../types'

export type LoginProps = Props

const Login: React.FC<Props> = ({ login, history, isAuthenticated, auth }): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)

  async function onSubmit(values: Values, helpers: FormikHelpers<FormikValues>): Promise<void> {
    try {
      const data: { pd_access_token: string } = await login(values)
      helpers.setSubmitting(false)
    } catch (err) {
      setFormMessage('Error logging in!')
    }
  }

  if (isAuthenticated && !!auth) {
    return <Redirect to={`/auth/${auth.id}`} />
  }

  return (
    <Content classNames={['user', 'flex', 'full', 'h-full', 'justify-center', 'align-start']}>
      <FormTemplate
        maxWidth="md"
        initialValues={initialValues}
        validate={(values: FormikValues): FormikErrors<FormikValues> =>
          validation(values, ['email', 'password'])
        }
        onSubmit={onSubmit}
        formMessage={formMessage}
        formConfig={formConfig}
        page={1}
      />
    </Content>
  )
}

export const ConnectedLogin = handleExport(Login)
