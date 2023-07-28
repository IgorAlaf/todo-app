import React, { FC } from 'react'

interface IProps {
  tasksInPage: number
  tasksLength: number
  paginate: Function
}

const Paginate: FC<IProps> = ({ tasksInPage, tasksLength, paginate }) => {
  const pageNumbers = []
  //   console.log(tasksLength)
  for (let i = 1; i <= Math.ceil(tasksLength / tasksInPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className=' mt-2 py-2 absolute bottom-[10px] left-[78px]'>
      <ul className='flex gap-2'>
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className='cursor-pointer px-4 py-2 bg-[#011F23]  text-white text-sm rounded-sm'
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Paginate
