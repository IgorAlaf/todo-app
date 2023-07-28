import React, { FC, useEffect } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { fetchLogout } from '../../../store/AsyncFunctions'

const Header: FC<{ text?: string }> = ({ text }) => {
  const { isAuth } = useAppSelector(store => store.userReducer)
  const dispatch = useAppDispatch()
  return (
    <div className='py-[16px] bg-[#163235]'>
      <div className='flex items-center justify-between max-w-[1230px] mx-auto px-[15px]'>
        <h1 className='text-[30px] font-semibold leading-[125%] text-white'>
          {isAuth ? 'User' : 'Logo'}
        </h1>
        <div>
          {isAuth ? (
            <button
              className='bg-[#FF7474] rounded-[30px] text-white py-[7px] px-[16px] text-[13px] font-semibold'
              onClick={() => dispatch(fetchLogout())}
            >
              Log out
            </button>
          ) : (
            <Link
              to={`/${
                text?.toLowerCase().replaceAll(' ', '') === 'signin'
                  ? 'auth/login'
                  : 'auth'
              }`}
              className='bg-[#74A4FF] rounded-[30px] text-white py-[8px] px-[16px] text-[13px] font-semibold'
            >
              {text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
