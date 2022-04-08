import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Content } from '../../components/shared/Content'

import { Model, Response } from '../../types'

export type ResponseModalProps = RouteComponentProps & {
  data: Model<Response>
  onModalChange: Function
}

const Modal: React.FC<ResponseModalProps> = ({ onModalChange, data, history }): JSX.Element => {
  return (
    <Content classNames={['modal-section', 'justify-start', 'column', 'align-center']}>
      <h4 className="modal-section-title">Survey Response Summary</h4>
      <React.Fragment>
        {data.status === 'viewed' && (
          <p className="modal-paragraph">
            This survey has been viewed, but is not yet complete. Click the link again in the future
            to come back and finish.
          </p>
        )}
        {data.status === 'completed' && (
          <p className="modal-paragraph">Thank You, The Survey Is Completed!</p>
        )}
      </React.Fragment>
      <button
        type="button"
        className="modal-section-button"
        onClick={() => {
          onModalChange({ active: false })
          if (data.status === 'completed') {
            history.push('/')
          }
        }}
      >
        Ok
      </button>
    </Content>
  )
}

export const ResponseModal = withRouter(Modal)
