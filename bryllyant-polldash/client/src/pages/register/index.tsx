import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import { Content } from '../../components/shared/Content'
import { Props, Values, initialValues, handleExport, formConfig } from './config'
import validation from '../../utils/validation'
import { FormTemplate } from '../../components/shared/form'

import { Data, User } from '../../types'

export type RegisterProps = Props

const Register: React.FC<Props> = ({ register, history, isAuthenticated, auth }): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)

  async function onSubmit(values: Values, helpers: FormikHelpers<Values>): Promise<void> {
    try {
      const data: Data<User> = await register({ body: values })
      helpers.setSubmitting(false)
      if (data.id) {
        history.push('/users/login')
      }
    } catch (err) {
      helpers.setSubmitting(false)
      setFormMessage('Error registering user')
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
          validation(values, [
            'firstName',
            'lastName',
            'email',
            'mobile',
            'password',
            'passwordConfirmation',
          ])
        }
        onSubmit={onSubmit}
        formMessage={formMessage}
        formConfig={formConfig}
        page={1}
      />
    </Content>
  )
}

export const ConnectedRegister = handleExport(Register)
