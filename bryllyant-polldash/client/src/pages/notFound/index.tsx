import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

export type NotFoundProps = RouteComponentProps & {
  staticContext?: any
}

export const NotFound: React.FC<NotFoundProps> = ({ staticContext }) => {
  staticContext.status = 404
  return <h1>Oops, nothing here!</h1>
}
