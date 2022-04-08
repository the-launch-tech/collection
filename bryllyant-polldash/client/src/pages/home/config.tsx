import { connect } from 'react-redux'

import Maps from '../../redux/maps'

export type Props = ReturnType<typeof Maps.state.Home>

export const handleExport = (Component: React.FC<Props>) => {
  return connect(Maps.state.Home, null)(Component)
}
