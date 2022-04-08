import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import Maps from '../../../redux/maps'

export type Props = ReturnType<typeof Maps.state.Responses> &
  ReturnType<typeof Maps.dispatch.Responses> &
  RouteComponentProps

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Responses, Maps.dispatch.Responses)(withRouter(Component))
}
