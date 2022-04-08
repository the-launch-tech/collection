import { FormikErrors, FormikValues } from 'formik'

import validations from './validations'

export default function(values: FormikValues, fields: string[]): FormikErrors<FormikValues> {
  let errors: FormikErrors<FormikValues> = {}
  if (validations.firstName(values) && fields.includes('firstName')) {
    errors.firstName = validations.firstName(values)
  }
  if (validations.lastName(values) && fields.includes('lastName')) {
    errors.lastName = validations.lastName(values)
  }
  if (validations.email(values) && fields.includes('email')) {
    errors.email = validations.email(values)
  }
  if (validations.mobile(values) && fields.includes('mobile')) {
    errors.mobile = validations.mobile(values)
  }
  if (validations.password(values) && fields.includes('password')) {
    errors.password = validations.password(values)
  }
  if (validations.passwordConfirmation(values) && fields.includes('passwordConfirmation')) {
    errors.passwordConfirmation = validations.passwordConfirmation(values)
  }
  if (validations.name(values) && fields.includes('name')) {
    errors.name = validations.name(values)
  }
  if (validations.title(values) && fields.includes('title')) {
    errors.title = validations.title(values)
  }
  if (validations.questions(values) && fields.includes('questions')) {
    errors.questions = validations.questions(values)
  }
  if (fields.includes('questions')) {
    errors = validations.nestedQuestion(values, errors)
  }
  return errors
}
