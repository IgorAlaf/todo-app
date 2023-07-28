import React, { FormEventHandler, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchAddTodo } from '../../store/AsyncFunctions'
import useResize from '../../hooks/useResize'

const AddItem = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { width } = useResize()
  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (title) {
      if (title.length > 30) {
        setError('Todo have to more than 30 symbols')
        return
      }
      await dispatch(fetchAddTodo(title))
      setTitle('')
    } else {
      setError('Todo is empty')
    }
  }
  return (
    <form
      className=' text-white flex items-center justify-center pt-[30px] pb-[47px]  relative xs:px-2'
      style={{ width: '100%' }}
      onSubmit={onSubmit}
    >
      <input
        type='text'
        value={title}
        onChange={e => {
          setTitle(e.target.value)
          setError('')
        }}
        className='py-1 px-5 outline-none border border-solid shadow-sm text-black md:px-2 flex-auto text-ellipsis'
        // style={{ flex: "1 1 100%" }}
      />
      <button
        className='bg-[#155FEE]  px-5 font-semibold text-[18px] md:px-2 py-[3.8px] xs:py-[4.1px] xs:px-3 xs:rounded-[50%] xs:ml-2'
        // style={{ flex: "1 1 20%" }}
        type='submit'
      >
        {width > 375 ? 'new todo' : '+'}
      </button>
      {error && (
        <div className='text-red-500 text-sm absolute left-0 top-1 text-ellipsis'>
          <p className='text-ellipsis'>{error}</p>
        </div>
      )}
    </form>
  )
}

export default AddItem
