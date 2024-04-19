import React, { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'

type Props = {}

const AddCabin = ({}: Props): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <div>
      <Button onClick={() => setIsOpenModal((val) => !val)}>Add New Cabin</Button>
        {
        isOpenModal && <Modal closeModal={onCloseModal} />
        }
    </div>
  )
}

export default AddCabin