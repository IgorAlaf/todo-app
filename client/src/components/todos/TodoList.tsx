import React, { FC, useEffect, useState } from 'react'
import ListItem from './ListItem'
import AddItem from './AddItem'
import HeaderTodo from './HeaderTodo'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchGetTodos } from '../../store/AsyncFunctions'
import { useAppSelector } from '../../hooks/useAppSelector'
import Paginate from '../paginate/Paginate'

const TodoList: FC = () => {
  const dispatch = useAppDispatch()
  const { todos } = useAppSelector(state => state.todoReducer)
  const [tasksInPage] = useState(Math.min(5))
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    async function getTodos() {
      await dispatch(fetchGetTodos())
    }
    getTodos()
  }, [])
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const lastTodo = currentPage * tasksInPage
  const firstTodo = lastTodo - tasksInPage
  return (
    <div className='flex flex-col items-center mx-auto bg-[#163235] rounded-[5px] px-[78px] pb-[78px] pt-[3px] relative max-w-[910px] min-h-[404px] lg:max-w-[700px] md:px-[45px] md:max-w-[600px] hr:px-[25px] hr:max-w-[450px] '>
      <HeaderTodo capacity={todos.length} />
      <div className='absolute w-[100%] h-[1px] bg-[#828282] top-[50px]'></div>
      <AddItem />
      <ul
        style={{ width: '100%', flex: '1 1 auto' }}
        className=' flex flex-col gap-y-[15px]'
      >
        {todos.slice(firstTodo, lastTodo).map(task => (
          <ListItem key={task.todo_id} todo={task} />
        ))}
      </ul>
      <Paginate
        tasksInPage={tasksInPage}
        tasksLength={todos.length}
        paginate={paginate}
      />
    </div>
  )
}

export default TodoList
