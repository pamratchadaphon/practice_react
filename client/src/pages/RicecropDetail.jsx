import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useParams } from 'react-router-dom'

const Dashboard = () => {
  const { idFarmer, idRicecrop } = useParams(); 
  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar idFarmer={idFarmer}/>
      </div>
      <div className='basis-[84%] border'>
        <div className='px-[30px] py-[30px]'>
        <Link className="btn btn-secondary" style={{float: 'right'}} to={`/Income/${idFarmer}/${idRicecrop}`}>บันทึกรายรับ</Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
