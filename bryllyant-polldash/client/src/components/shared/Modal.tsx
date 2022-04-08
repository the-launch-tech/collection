import * as React from 'react'
import { connect } from 'react-redux'

import Maps from '../../redux/maps'

export type ModalProps = ReturnType<typeof Maps.state.Modal>

const Modal: React.FC<ModalProps> = ({ modal }): JSX.Element => {
  const { Component, active, onClose } = modal
  return (
    <div id="modal" className={`modal ${modal.active ? 'active-modal' : ''}`}>
      <div className="modal-container">
        <i
          className="fal fa-times modal-close"
          onClick={modal.onClose ? modal.onClose : () => {}}
        />
        <div className="modal-content">{Component && <Component />}</div>
      </div>
    </div>
  )
}

export const ConnectedModal = connect(Maps.state.Modal)(Modal)
