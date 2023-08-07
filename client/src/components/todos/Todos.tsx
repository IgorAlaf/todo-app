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
      <div className=' px-[15px] mt-[210px] hr:mt-[100px]'>
        <TodoList />
      </div>
    </div>
  )
}

export default Todos
