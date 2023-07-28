import React, { useEffect, useState } from 'react'
import './index.css'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchCheckAuth } from './store/AsyncFunctions'
import { useAppSelector } from './hooks/useAppSelector'
import { IUser } from './models/IUser'
import Todos from './components/todos/Todos'
import { useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'

function App() {
  const dispatch = useAppDispatch()
  const { user, isAuth, isLoading } = useAppSelector(state => state.userReducer)
  const [users, setUsers] = useState<IUser[]>([])
  const [show, setShow] = useState<boolean>(true)
  const navigate = useNavigate()
  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('user_id')) {
        navigate('/auth')
      }
      if (localStorage.getItem('token')) {
        await dispatch(fetchCheckAuth())
      }
    }
    check()
  }, [])
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isAuth) navigate('/auth')

  return (
    <div className=''>
      <Layout>
        <Todos isAuth={isAuth} />
      </Layout>
    </div>
  )
}

export default App
