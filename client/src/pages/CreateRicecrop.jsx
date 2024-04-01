import React from 'react'
import Sidebar from '../components/Sidebar'
import FormRicecrop from '../components/FormRicecrop'

const CreateRicecrop = () => {
  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar/>
      </div>
      <div className='basis-[84%] border'>
        <FormRicecrop/>
      </div>
    </div>
  )
}

export default CreateRicecrop
