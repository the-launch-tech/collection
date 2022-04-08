import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import Maps from '../../../redux/maps'

export type Props = RouteComponentProps & ReturnType<typeof Maps.state.Dashboard>

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Dashboard, null)(withRouter(Component))
}
