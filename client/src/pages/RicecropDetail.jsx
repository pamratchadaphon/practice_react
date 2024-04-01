import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar/>
      </div>
      <div className='basis-[84%] border'>
        
      </div>
    </div>
  )
}

export default Dashboard
