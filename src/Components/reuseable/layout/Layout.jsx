import React from 'react'
import Header from '../header/Header' 
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer'

function Layout() {
  return (
    <div>
      <Header />
      <main className="w-[100%] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout;