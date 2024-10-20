import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-64'>
        <SideNav />
      </div>
      <div>
        <Header />
        <div className='ml-64 p-10'>

        {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout