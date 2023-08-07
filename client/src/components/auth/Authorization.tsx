import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchRegistration } from '../../store/AsyncFunctions'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../hooks/useAppSelector'
import classNames from 'classnames'
interface IAuth {
  email: string
  password: string
  confirmPass: string
}

const Authorization: FC = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>('')
  const { isAuth } = useAppSelector(state => state.userReducer)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuth>({
    mode: 'onChange'
  })
  const onSubmit: SubmitHandler<IAuth> = async data => {
    if (data.password === data.confirmPass) {
      setLoading(true)
      const response = await dispatch(
        fetchRegistration(data.email, data.password)
      )
      setLoading(false)
      if (!response) {
        navigate(`/`)
      }
      setError(response)
      setValid(true)
    } else {
      setValid(false)
    }
  }
  const waitSubmit: SubmitHandler<IAuth> = async data => {
    setTimeout(() => {}, 1000)
  }
  return (
    <div
      className='flex items-center justify-center flex-col gap-5 mt-[105px]'
      style={{ height: '100%' }}
    >
      <form
        onSubmit={handleSubmit(isLoading ? waitSubmit : onSubmit)}
        className='rounded-[30px] hr:rounded-[15px]  bg-gray-300 bg-opacity-10 text-white shadow-xl flex flex-col justify-center  px-[74px] py-10 gap-y-5 hr:px-10 xs:px-6'
        style={{ maxWidth: '3a84px' }}
      >
        <div>
          <h1 className='text-[32px] hr:text-[28px]'>Sign up</h1>
          <h3 className=' text-gray-400 font-[250] text-[15px]'>
            login to manage your account
          </h3>
        </div>
        <div className='flex flex-col gap-[20px] mt-5'>
          <input
            type='email'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent tr:px-3'
            // onChange={e => setEmail(e.target.value)}
            placeholder='email'
            {...register('email', {
              required: 'email is required field',
              maxLength: 50,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'please enter valid email'
              }
            })}
          />
          {errors.email?.type === 'required' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              {errors.email?.message}
            </div>
          )}
          {errors.email?.type === 'pattern' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              {errors.email?.message}
            </div>
          )}
          {errors.email?.type === 'maxLength' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              Email can't be more than 50 symbols
            </div>
          )}

          <input
            id='pass'
            type='password'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent tr:px-3'
            placeholder='password'
            {...register('password', {
              required: 'password is required field',
              maxLength: 50,
              minLength: 6
            })}
          />
          {errors.password?.type === 'required' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              {errors.password?.message}
            </div>
          )}
          {errors.password?.type === 'minLength' && (
            <div className='text-red-500 text-sm text-bold tr:text-xs'>
              password can't be less than 6 symbols
            </div>
          )}
          {errors.password?.type === 'maxLength' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              Password can't be more than 50 symbols
            </div>
          )}
          <input
            id='pass-confirm'
            type='password'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50  outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent tr:px-3'
            placeholder='confirm pass'
            {...register('confirmPass', {
              required: 'confirm pass is required field',
              maxLength: 50,
              minLength: 6
            })}
          />
          {errors.confirmPass?.type === 'required' && (
            <div className='text-red-500 text-sm text-bold tr:text-xs'>
              {errors.confirmPass?.message}
            </div>
          )}
          {errors.confirmPass?.type === 'minLength' && (
            <div className='text-red-500 text-sm text-bold tr:text-xs'>
              password can't be less than 6 symbols
            </div>
          )}
          {errors.confirmPass?.type === 'maxLength' && (
            <div className='text-red-500 text-sm tr:text-xs'>
              Password can't be more than 50 symbols
            </div>
          )}
          {!valid && (
            <div className='text-teal-500 text-sm text-bold tr:text-xs'>
              You enter different passwords!!!
            </div>
          )}
        </div>
        {error && (
          <div className='text-red-400 text-sm- text-bold tr:text-xs'>
            {error}
          </div>
        )}
        <button
          type='submit'
          style={{ width: '100%' }}
          className={classNames(
            ' animate duration-300 py-[6px] w-32 rounded-md hover:bg-blue-500 text-white bg-[#026EF0] shadow-xl text-sm mt-[40px] sm:mt-2',
            { 'cursor-not-allowed': isLoading }
          )}
        >
          Sign up
        </button>
      </form>
      <div className='text-white text-center text-sm flex flex-col gap-y-2'>
        <p>
          <span className='mr-1 text-gray-500'>Have you an account?</span>
          <Link to={'/auth/login'} className='text-[#3B82F6]'>
            Sign in
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Authorization
