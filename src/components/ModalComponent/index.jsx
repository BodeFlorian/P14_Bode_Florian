import React from 'react'
import { Modal } from 'my-modal-test-bf'

export const ModalComponent = ({ message, onClose }) => {
  return <Modal message={message} onClose={onClose} />
}
