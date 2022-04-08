import Validator from 'validator'
import { FormikValues, FormikErrors } from 'formik'

export default {
  firstName: (values: FormikValues): string | undefined => {
    if (!values.firstName) {
      return 'A first name is required'
    }
    return undefined
  },
  lastName: (values: FormikValues): string | undefined => {
    if (!values.lastName) {
      return 'A last name is required'
    }
    return undefined
  },
  email: (values: FormikValues): string | undefined => {
    if (!values.email) {
      return 'Required'
    } else if (!Validator.isEmail(values.email)) {
      return 'Must be a valid email address'
    }
    return undefined
  },
  mobile: (values: FormikValues): string | undefined => {
    if (!values.mobile) {
      return 'A phone is required'
    } else if (!Validator.isMobilePhone(values.mobile)) {
      return 'Must be a valid phone number'
    }
    return undefined
  },
  password: (values: FormikValues): string | undefined => {
    if (!values.password) {
      return 'A password is required!'
    } else if (values.password.length < 8) {
      return 'Must be greater than 8 characters!'
    } else if (values.password.length > 199) {
      return 'Must be less than 200 characters!'
    }
    return undefined
  },
  passwordConfirmation: (values: FormikValues): string | undefined => {
    if (!values.passwordConfirmation) {
      return 'A confirmation is required!'
    } else if (values.passwordConfirmation.length < 8) {
      return 'Must be greater than 8 characters!'
    } else if (values.passwordConfirmation.length > 199) {
      return 'Must be less than 200 characters!'
    } else if (values.passwordConfirmation !== values.password) {
      return 'Does not match password!'
    }
    return undefined
  },
  title: (values: FormikValues): undefined | string => {
    if (!values.title) {
      return 'Please add title to your poll'
    }
    return undefined
  },
  name: (values: FormikValues): undefined | string => {
    if (!values.name) {
      return 'Please add name to your group'
    }
    return undefined
  },
  questions: (values: FormikValues): undefined | string => {
    if (!values.questions) {
      return 'Please add your poll questions'
    }
    return undefined
  },
  nestedQuestion: (
    values: FormikValues,
    errors: FormikErrors<FormikValues>
  ): FormikErrors<FormikValues> => {
    if (!values.question) {
      return errors
    }
    for (let i: number = 0; i < values.questions.length; i++) {
      if (!values.questions[i].text || values.questions[i].text === 'Enter a question...') {
        errors[`question.${i}.text`] = 'A question is required'
      }
    }
    return errors
  },
}
