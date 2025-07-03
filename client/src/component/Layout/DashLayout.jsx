import React from 'react'
import Header from './Header'
import DashFooter from './DashFooter'

const DashLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}>{children}</div>
      <DashFooter/>
    </>
  )
}

export default DashLayout