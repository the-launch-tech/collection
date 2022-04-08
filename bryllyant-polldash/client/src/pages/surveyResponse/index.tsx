import * as React from 'react'
import * as jwt from 'jsonwebtoken'
import * as qs from 'qs'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import validation from '../../utils/validation'
import { FormTemplate } from '../../components/shared/form'
import { Content } from '../../components/shared/Content'
import * as Constants from '../../constants'
import { ResponseModal } from './ResponseModal'

import { handleExport, Props, Values, initialValues, formConfig } from './config'

import { Model, User, Poll, Question, Response } from '../../types'

export type SurveyResponseProps = Props

const SurveyResponse: React.FC<Props> = ({
  location,
  onModalChange,
  updateResponse,
  findResponseData,
  response,
}): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)
  const [formDataPrepared, setFormDataPrepared] = React.useState<boolean>(false)
  const [invalidMessage, setInvalidMessage] = React.useState<string | null>(null)
  const [valid, setValid] = React.useState<
    | {
        responseId: number
        userId: number
        distributionId: number
      }
    | false
  >(false)

  React.useEffect(() => {
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true })
    const responseId = parseInt(queryString.responseId as string)
    const userId = parseInt(queryString.userId as string)
    const distributionId = parseInt(queryString.distributionId as string)
    const token = queryString.token as string
    const decoded = jwt.verify(token, Constants.EMAIL_TOKEN) as any
    if (
      responseId === decoded.responseId &&
      userId === decoded.userId &&
      distributionId === decoded.distributionId
    ) {
      setValid({ responseId, userId, distributionId })
    } else {
      setInvalidMessage('Your token is invalid!')
    }
  }, [location])

  React.useEffect(() => {
    if (valid) {
      fetchData()
    }
  }, [valid])

  React.useEffect(() => {
    if (response && !formDataPrepared) {
      setFormDataPrepared(true)
    }
  }, [response])

  async function fetchData(): Promise<void> {
    if (valid) {
      await findResponseData(valid.responseId)
    }
  }

  function renderForm() {
    if (!response) {
      return <React.Fragment />
    }

    const bootstrappedInitialValues = initialValues(response)
    const bootstrappedFormConfig = formConfig(response)

    return (
      <FormTemplate
        maxWidth="md"
        initialValues={bootstrappedInitialValues}
        onSubmit={onSubmit}
        validate={() => ({})}
        formMessage={formMessage}
        formConfig={bootstrappedFormConfig}
        page={1}
      />
    )
  }

  async function onSubmit(values: Values, helpers: FormikHelpers<Values>): Promise<void> {
    try {
      if (!valid) return
      const answers = Object.keys(values).map(key => {
        return { questionId: parseInt(key), answer: values[key] }
      })
      const data: Model<Response> = await updateResponse(valid.responseId, { answers })
      helpers.setSubmitting(false)
      onModalChange({
        active: true,
        Component: () => <ResponseModal onModalChange={onModalChange} data={data} />,
        onClose: (event: React.MouseEvent) => {
          onModalChange({ active: false })
        },
      })
    } catch (err) {
      helpers.setSubmitting(false)
      setFormMessage('Error submitting survey')
    }
  }

  return (
    <Content
      classNames={[
        'survey-response',
        'full',
        'wrap',
        'column',
        'justify-start',
        'align-stretch',
        'p-5',
      ]}
    >
      <div>
        {formDataPrepared ? (
          renderForm()
        ) : (
          <div className="preparing-form-data-container">
            <h4 className="preparing-form-data-message">Preparing Survey</h4>
          </div>
        )}
      </div>
      <div className="invalid-survey-container">
        {invalidMessage && <p className="invalid-survey-message">{invalidMessage}</p>}
      </div>
    </Content>
  )
}

export const ConnectedSurveyResponse = handleExport(SurveyResponse)
