import React, { FC } from 'react'
import TodoList from './TodoList'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchLogout } from '../../store/AsyncFunctions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'
const Todos: FC<{ isAuth: boolean }> = ({ isAuth }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.userReducer)
  if (!isAuth) navigate('/auth')

  return (
    <div>
      <header
        className='bg-[#3C4043] flex items-center justify-between'
        style={{ minHeight: '50px' }}
      >
        <div className='ml-5 text-lg text-white'>
          <h3 className=''>{user.email}</h3>
        </div>
        <button
          className=' text-white bg-[#007BFF] py-2 px-5 mr-2 rounded-sm'
          onClick={() => dispatch(fetchLogout())}
        >
          Log out
        </button>
      </header>
      <div
        className='flex items-center justify-center px-[15px]'
        style={{ marginTop: '150px' }}
      >
        <TodoList />
      </div>
    </div>
  )
}

export default Todos
