import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

type Props = {}

const CardTableOperations = ({}: Props) => {
  return (
    <TableOperations>
      <Filter filterField='discount' options={[
        { value: "all", label: "all"},
        { value: "no-discount", label: "No discount"},
        { value: "with-discount", label: "With dicount"},
      ]} />
    </TableOperations>
  )
}

export default CardTableOperations