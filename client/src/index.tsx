import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authorization from './components/auth/Authorization'
import LoginForm from './components/auth/LoginForm'
import Layout from './components/layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/todos',
    element: <App />
  },
  {
    path: '/auth',
    element: (
      <Layout text='Sign in'>
        <Authorization />
      </Layout>
    )
  },
  {
    path: '/auth/login',
    element: (
      <Layout text='Sign up'>
        <LoginForm />
      </Layout>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
