import { useState } from 'react'
import Modal from './Modal'
import { ITodo } from '../../types/todo.interface'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import cn from 'classnames'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchEditTodo, fetchRemoveTodo } from '../../store/AsyncFunctions'
interface IProps {
  todo: ITodo
}

const ListItem = ({ todo }: IProps) => {
  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState<boolean>(false)
  const dispath = useAppDispatch()
  const handleCheck = async () => {
    setCheck(prev => !prev)
    const response = await dispath(
      fetchEditTodo(todo.todo_id, { title: todo.title, completed: check })
    )
  }
  const deleteItem = async () => {
    try {
      await dispath(fetchRemoveTodo(todo.todo_id))
      // if (response.status === 200) {
      //   getData()
      // }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <li
      className={cn(
        'flex text-black justify-between p px-2 py-[3px]',
        { 'bg-white': check },
        { 'bg-[#D9D9D9]': !check }
      )}
      style={{ width: '100%' }}
    >
      <label className='flex gap-1 cursor-pointer items-center justify-center'>
        <div className='container flex-1 '>
          <input
            type='checkbox'
            className='checkbox'
            checked={check}
            onChange={handleCheck}
          />
          <span className='checkmark'></span>
        </div>
        <p className='select-none text-[20px] sm:text-[16px] xs:text-[14px] text-clip break-all'>
          {todo.title}
        </p>
      </label>

      <div className='flex gap-3 sm:gap-1'>
        <button className='' onClick={() => setShowModal(true)}>
          <div className=''>
            <img
              className='w-[28px] hr:w-[22px]'
              src='images/pencil-edit.svg'
              alt='delete'
            />
          </div>
        </button>
        <button className='' onClick={deleteItem}>
          <div className=''>
            <img
              className='w-[28px] hr:w-[22px]'
              src='images/remove.svg'
              alt='hello'
            />
          </div>
        </button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} todo={todo} mode={'edit'} />
      )}
    </li>
  )
}

export default ListItem
