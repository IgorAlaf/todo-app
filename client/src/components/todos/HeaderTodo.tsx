import React, { FC } from 'react'

interface IProps {
  capacity: number
}

const HeaderTodo: FC<IProps> = ({ capacity }) => {
  return (
    <div
      className=' text-white py-[8px] text-[20px] '
      style={{ width: '100%' }}
    >
      <h2>Todos({capacity})</h2>
    </div>
  )
}

export default HeaderTodo
