import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import Maps from '../../../redux/maps'

export type Props = ReturnType<typeof Maps.state.Distributions> &
  ReturnType<typeof Maps.dispatch.Distributions> &
  RouteComponentProps

export const handleExport = (Component: React.FC<Props>) => {
  return connect(
    Maps.state.Distributions,
    Maps.dispatch.Distributions
  )(withRouter(Component))
}
