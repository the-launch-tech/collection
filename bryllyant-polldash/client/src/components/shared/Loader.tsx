import * as React from 'react'
import { connect } from 'react-redux'

import Maps from '../../redux/maps'

export type LoaderProps = ReturnType<typeof Maps.state.Loader>

const Loader: React.FC<LoaderProps> = ({ loading }): JSX.Element => {
  return (
    <div id="loader" className={`loader ${loading ? 'loader-active' : ''}`}>
      <div className="loader-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export const ConnectedLoader = connect(Maps.state.Loader)(Loader)
