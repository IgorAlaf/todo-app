import React, { FC } from 'react'
import Header from './header/Header'

const Layout: FC<{
  children: string | JSX.Element | JSX.Element[]
  text?: string
}> = ({ children, text }) => {
  return (
    <div>
      <Header text={text} />
      {children}
    </div>
  )
}

export default Layout
