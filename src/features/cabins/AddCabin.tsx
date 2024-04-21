import React, { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'
import CabinTable from './CabinTable'

type Props = {}

const AddCabin = ({}: Props): React.ReactElement => {

  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}

export default AddCabin